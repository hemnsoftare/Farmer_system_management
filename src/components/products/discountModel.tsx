import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdDiscount, MdDelete } from "react-icons/md";
import { AlertTriangle, Check, X } from "lucide-react";
import Image from "next/image";
import { ProductFormInput } from "@/lib/action";
import { doc, updateDoc } from "firebase/firestore";
import { d } from "@nextui-org/slider/dist/use-slider-a94a4c83";
import { db } from "@/config/firebaseConfig";
import { queryClient } from "@/app/[locale]/ClientProviders";

interface DiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductFormInput | null;
  onSaveDiscount: (
    productId: string,
    discount: number,
    isDiscount: boolean
  ) => Promise<void>;
}

export default function DiscountDialog({
  isOpen,
  onClose,
  product,
  onSaveDiscount,
}: DiscountDialogProps) {
  const [discountValue, setDiscountValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (product && isOpen) {
      setDiscountValue(product.discount ? product.discount.toString() : "");
      setError("");
    } else {
      setDiscountValue("");
      setError("");
    }
  }, [product, isOpen]);

  if (!product) return null;

  const originalPrice =
    product.isDiscount && product.discount
      ? product.price + product.discount * 0.01 * product.price
      : product.price;

  const discountedPrice = discountValue
    ? originalPrice - parseFloat(discountValue) * 0.01 * originalPrice
    : product.price;

  const handleSave = async () => {
    const discount = parseFloat(discountValue);

    if (isNaN(discount) || discount < 0 || discount > 100) {
      setError("Please enter a valid discount between 0 and 100");
      return;
    }

    setIsLoading(true);
    try {
      await onSaveDiscount(product.id, discount, discount > 0);
      onClose();
    } catch (err) {
      setError("Failed to save discount. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveDiscount = async () => {
    console.log(product.id);
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "Products", product.id), {
        discount: 0,
        isDiscount: false,
      });
      queryClient.setQueryData(["productsDiscount"], (oldData: any) => {
        return oldData?.filter(
          (item: ProductFormInput) => item.id !== product.id
        );
      });

      onClose();
    } catch (err) {
      setError("Failed to remove discount. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (!isNaN(parseFloat(value)) &&
        parseFloat(value) >= 0 &&
        parseFloat(value) <= 100)
    ) {
      setDiscountValue(value);
      setError("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MdDiscount className="h-5 w-5 text-orange-500" />
            Manage Discount
          </DialogTitle>
          <DialogDescription>
            Set or update the discount for {product.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 w-full">
          {/* Product Preview */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <Image
              src={product.bigimageUrl}
              alt={product.name}
              className="h-12 w-12 rounded-lg object-cover"
              width={48}
              height={48}
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Current Price: ${product.price}
              </p>
            </div>
            {product.isDiscount && (
              <div className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-800 dark:text-orange-200">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          {/* Discount Input */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount Percentage</Label>
            <div className="relative">
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="Enter discount percentage (0-100)"
                value={discountValue}
                onChange={handleInputChange}
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                %
              </span>
            </div>
            {error && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Price Preview */}
          {discountValue && !error && (
            <div className="rounded-lg w-full border bg-blue-50 p-3 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-medium text-sm mb-2">Price Preview</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Original Price:
                  </span>
                  <span>${originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Discount:
                  </span>
                  <span className="text-orange-600">-{discountValue}%</span>
                </div>
                <div className="flex justify-between border-t pt-1 font-medium">
                  <span>Final Price:</span>
                  <span className="text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>You save:</span>
                  <span>${(originalPrice - discountedPrice).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex  gap-2">
            {product.isDiscount && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemoveDiscount}
                disabled={isLoading}
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <MdDelete className="mr-2 h-4 w-4" />
                Remove Discount
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading || !!error || !discountValue}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Discount
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

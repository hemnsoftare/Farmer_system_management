"use client";
import { useEffect, useState } from "react";
import { OrderType } from "@/lib/action";
import { getAllOrder } from "@/lib/action/uploadimage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import { selectedOrder } from "@/lib/store/filterProducts";
import { format } from "date-fns";
// UI Components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Loader2,
  Search,
  Calendar,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  Circle,
} from "lucide-react";

const OrderHistoryPage = () => {
  const router = useRouter();
  const { selectOrder } = selectedOrder();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [allOrders, setAllOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrder();
        setOrders(data as OrderType[]);
        setAllOrders(data as OrderType[]);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Apply time filter
  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    const now = new Date();
    let filteredOrders;

    switch (value) {
      case "current-month":
        filteredOrders = allOrders.filter((order: any) => {
          const orderDate = new Date(order.orderDate.seconds * 1000);
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "last-6-months":
        filteredOrders = allOrders.filter((order: any) => {
          const orderDate = new Date(order.orderDate.seconds * 1000);
          return (
            now.getTime() - orderDate.getTime() <= 180 * 24 * 60 * 60 * 1000
          );
        });
        break;

      case "current-year":
        filteredOrders = allOrders.filter((order: any) => {
          const orderDate = new Date(order.orderDate.seconds * 1000);
          return orderDate.getFullYear() === now.getFullYear();
        });
        break;

      case "all":
        filteredOrders = [...allOrders];
        break;

      default:
        filteredOrders = allOrders.filter((order: any) => {
          const orderDate = new Date(order.orderDate.seconds * 1000);
          return orderDate.getFullYear() === parseInt(value);
        });
    }

    // Apply search filter to the time-filtered results
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setOrders(filteredOrders);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    let filtered = [...allOrders];

    // Apply existing time filter
    if (timeFilter !== "all") {
      const now = new Date();

      switch (timeFilter) {
        case "current-month":
          filtered = filtered.filter((order: any) => {
            const orderDate = new Date(order.orderDate.seconds * 1000);
            return (
              orderDate.getMonth() === now.getMonth() &&
              orderDate.getFullYear() === now.getFullYear()
            );
          });
          break;

        case "last-6-months":
          filtered = filtered.filter((order: any) => {
            const orderDate = new Date(order.orderDate.seconds * 1000);
            return (
              now.getTime() - orderDate.getTime() <= 180 * 24 * 60 * 60 * 1000
            );
          });
          break;

        case "current-year":
          filtered = filtered.filter((order: any) => {
            const orderDate = new Date(order.orderDate.seconds * 1000);
            return orderDate.getFullYear() === now.getFullYear();
          });
          break;

        default:
          filtered = filtered.filter((order: any) => {
            const orderDate = new Date(order.orderDate.seconds * 1000);
            return orderDate.getFullYear() === parseInt(timeFilter);
          });
      }
    }

    // Apply search filter
    if (value) {
      filtered = filtered.filter(
        (order) =>
          order.fullName?.toLowerCase().includes(value.toLowerCase()) ||
          order.email?.toLowerCase().includes(value.toLowerCase()) ||
          order.id?.toLowerCase().includes(value.toLowerCase())
      );
    }

    setOrders(filtered);
  };

  // Handle view toggle
  const toggleOrderView = async (e: React.MouseEvent, order: OrderType) => {
    e.stopPropagation();

    try {
      // Update locally first for instant UI feedback
      setAllOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, view: !order.view } : item
        )
      );

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, view: !order.view } : item
        )
      );

      // Update in Firebase
      await updateDoc(doc(db, "order", order.id), {
        ...order,
        view: !order.view,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert changes if update fails
      setAllOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, view: order.view } : item
        )
      );

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, view: order.view } : item
        )
      );
    }
  };

  // Calculate order summary stats
  const totalOrders = orders.length;
  const totalItems = orders.reduce(
    (sum, item) => sum + item.orderItems.length,
    0
  );
  const totalRevenue = orders.reduce((sum, item) => sum + item.totalAmount, 0);
  const pendingOrders = orders.filter((order) => !order.view).length;

  // Format date for display
  const formatOrderDate = (seconds: number) => {
    try {
      return format(new Date(seconds * 1000), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Handle order selection
  const handleOrderSelect = (order: OrderType) => {
    selectOrder(order);
    router.push(`/dashboard/UserOrder/${order.id}`);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Items Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Order History Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold">
                Order History
              </CardTitle>
              <CardDescription>
                Track, return, or purchase items
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9 pr-4 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <Select onValueChange={handleTimeFilterChange} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue placeholder="Filter by date" />
                  </div>
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Time Periods</SelectLabel>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="all"
                    >
                      All Time
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="current-month"
                    >
                      Current Month
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="last-6-months"
                    >
                      Last 6 Months
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="current-year"
                    >
                      Current Year
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="2024"
                    >
                      2024
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="2023"
                    >
                      2023
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="2022"
                    >
                      2022
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="2021"
                    >
                      2021
                    </SelectItem>
                    <SelectItem
                      className="md:hover:bg-gray-100 duration-300 transition-all"
                      value="2020"
                    >
                      2020
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-white">Customer</TableHead>
                    <TableHead className="text-white text-center">
                      Items
                    </TableHead>
                    <TableHead className="text-white">Transaction ID</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white text-right">
                      Total
                    </TableHead>
                    <TableHead className="text-white">Order Date</TableHead>
                    <TableHead className="text-white text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-10 text-gray-500"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order: any, index) => (
                      <TableRow
                        key={order.id}
                        className="cursor-pointer hover:bg-indigo-50 transition-colors"
                        onClick={() => handleOrderSelect(order)}
                      >
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{order.fullName}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-indigo-50">
                            {order.orderItems.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {order.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {formatOrderDate(order.orderDate?.seconds)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={order.view ? "outline" : "default"}
                            className={
                              order.view
                                ? "bg-green-50 text-green-700 hover:bg-green-100"
                                : "bg-amber-500 hover:bg-amber-600"
                            }
                          >
                            {order.view ? "Reviewed" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => toggleOrderView(e, order)}
                            >
                              {order.view ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-amber-500" />
                              )}
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                className="bg-white"
                                align="end"
                              >
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOrderSelect(order);
                                  }}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOrderView(e, order);
                                  }}
                                >
                                  Mark as {order.view ? "Pending" : "Reviewed"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    <TableCell colSpan={2} className="text-white">
                      Totals
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {totalItems}
                    </TableCell>
                    <TableCell className="text-white">-</TableCell>
                    <TableCell className="text-white">-</TableCell>
                    <TableCell className="text-white text-right">
                      ${totalRevenue.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-white">-</TableCell>
                    <TableCell className="text-white">-</TableCell>
                    <TableCell className="text-white">-</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistoryPage;

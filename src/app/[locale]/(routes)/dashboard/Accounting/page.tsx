"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";

// ---------- Types ----------
interface ItemCartProps {
  id: string;
  quantity: number;
  price: number;
  discount?: number;
}

interface OrderType {
  id: string;
  userId: string;
  fullName: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  address: {
    streetName: string;
    city: string;
    region: string;
  };
  email: { emailAddress: string }[];
  orderItems: ItemCartProps[];
  orderDate: Timestamp;
  totalAmount: number;
  totaldiscountPrice: number;
  note?: string;
  view: boolean;
}

interface ProductType {
  id: string;
  iniPrice: number;
  price: number;
  // Other product fields that might be in your database
  name?: string;
  description?: string;
  category?: string;
}

interface MonthlyReport {
  month: string;
  monthIndex: number;
  year: number;
  revenue: number;
  cost: number;
  profit: number;
}

interface YearlyReport {
  year: number;
  revenue: number;
  cost: number;
  profit: number;
}

// Month names array for consistent ordering
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AccountingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [privateProducts, setPrivateProducts] = useState<ProductType[]>([]);
  // We don't need monthlyReports state anymore as we calculate it directly
  const [yearlyReports, setYearlyReports] = useState<YearlyReport[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Current year for reference
  const currentYear = new Date().getFullYear();

  // Helper function to fetch data from Firestore
  const fetchFirestoreData = async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      const db = getFirestore();

      // Fetch orders
      const ordersCollection = collection(db, "order");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderType[];

      // Fetch products (for sale)
      const productsCollection = collection(db, "Products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductType[];

      // Fetch private products (not for sale)
      const privateProductsCollection = collection(db, "PrivateProducts");
      const privateProductsSnapshot = await getDocs(privateProductsCollection);
      const privateProductsData = privateProductsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductType[];

      // Set state with fetched data
      setOrders(ordersData);
      setProducts(productsData);
      setPrivateProducts(privateProductsData);

      // Process the fetched data
      processFinancialData(ordersData, [
        ...productsData,
        ...privateProductsData,
      ]);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      setLoadingError(
        "Failed to load data from database. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to calculate financial totals
  const calculateTotals = (
    filteredOrders: OrderType[],
    allProducts: ProductType[]
  ) => {
    let revenue = 0;
    let cost = 0;

    filteredOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const product = allProducts.find((p) => p.id === item.id);
        if (product) {
          const itemRevenue =
            (item.price - (item.discount || 0)) * item.quantity;
          const itemCost = product.iniPrice * item.quantity;

          revenue += itemRevenue;
          cost += itemCost;
        }
      });
    });

    return {
      revenue: Number(revenue.toFixed(2)),
      cost: Number(cost.toFixed(2)),
      profit: Number((revenue - cost).toFixed(2)),
    };
  };

  // Process financial data for monthly and yearly reports
  const processFinancialData = (
    ordersData: OrderType[],
    allProducts: ProductType[]
  ) => {
    // Process yearly data only for the yearly chart
    const processYearlyData = () => {
      const years = [
        currentYear - 4,
        currentYear - 3,
        currentYear - 2,
        currentYear - 1,
        currentYear,
      ];
      const yearlyData: YearlyReport[] = [];

      years.forEach((year) => {
        let yearlyRevenue = 0;
        let yearlyCost = 0;

        // Filter orders for this year
        const yearOrders = ordersData.filter(
          (order) => order.orderDate.toDate().getFullYear() === year
        );

        // Calculate totals directly
        yearOrders.forEach((order) => {
          order.orderItems.forEach((item) => {
            const product = allProducts.find((p) => p.id === item.id);
            if (product) {
              const itemRevenue =
                (item.price - (item.discount || 0)) * item.quantity;
              const itemCost = product.iniPrice * item.quantity;

              yearlyRevenue += itemRevenue;
              yearlyCost += itemCost;
            }
          });
        });

        const yearlyProfit = yearlyRevenue - yearlyCost;

        // Add year data
        yearlyData.push({
          year,
          revenue: Number(yearlyRevenue.toFixed(2)),
          cost: Number(yearlyCost.toFixed(2)),
          profit: Number(yearlyProfit.toFixed(2)),
        });
      });

      return yearlyData;
    };

    // Set the yearly report data
    setYearlyReports(processYearlyData());

    // We don't need monthly reports anymore as we calculate them directly in getYearlyMonthsData
    // This improves accuracy and ensures all months are properly represented
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFirestoreData();

    // Set the current month and year as defaults
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  }, []);

  // Get monthly data for all 12 months of the selected year
  const getYearlyMonthsData = () => {
    if (orders.length === 0) return [];

    // Create an array for all 12 months with initial zero values
    const allMonths = MONTH_NAMES.map((monthName, monthIndex) => {
      return {
        month: `${monthName} ${selectedYear}`,
        monthIndex,
        year: selectedYear,
        revenue: 0,
        cost: 0,
        profit: 0,
      };
    });

    // Directly calculate values for each month from the orders data
    orders.forEach((order) => {
      const orderDate = order.orderDate.toDate();
      const orderMonth = orderDate.getMonth();
      const orderYear = orderDate.getFullYear();

      // Only process orders for the selected year
      if (orderYear === selectedYear) {
        const allProductsArray = [...products, ...privateProducts];

        // Calculate revenue, cost and profit for this order
        order.orderItems.forEach((item) => {
          const product = allProductsArray.find((p) => p.id === item.id);
          if (product) {
            const itemRevenue =
              (item.price - (item.discount || 0)) * item.quantity;
            const itemCost = product.iniPrice * item.quantity;
            const itemProfit = itemRevenue - itemCost;

            // Add to the corresponding month's data
            allMonths[orderMonth].revenue += Number(itemRevenue.toFixed(2));
            allMonths[orderMonth].cost += Number(itemCost.toFixed(2));
            allMonths[orderMonth].profit += Number(itemProfit.toFixed(2));
          }
        });
      }
    });

    // Round all numeric values to 2 decimal places
    allMonths.forEach((month) => {
      month.revenue = Number(month.revenue.toFixed(2));
      month.cost = Number(month.cost.toFixed(2));
      month.profit = Number(month.profit.toFixed(2));
    });

    return allMonths;
  };

  const allMonthsData = getYearlyMonthsData();

  // Handle year selection change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Handle month selection change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Handle refresh data
  const handleRefreshData = () => {
    fetchFirestoreData();
  };

  // Calculate total yearly statistics for the selected year
  const calculateYearlyTotals = () => {
    // Filter orders for selected year
    const yearOrders = orders.filter(
      (order) => order.orderDate.toDate().getFullYear() === selectedYear
    );

    let yearlyRevenue = 0;
    let yearlyCost = 0;
    let yearlyProfit = 0;

    const allProductsArray = [...products, ...privateProducts];

    // Calculate totals from orders
    yearOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const product = allProductsArray.find((p) => p.id === item.id);
        if (product) {
          const itemRevenue =
            (item.price - (item.discount || 0)) * item.quantity;
          const itemCost = product.iniPrice * item.quantity;

          yearlyRevenue += itemRevenue;
          yearlyCost += itemCost;
        }
      });
    });

    yearlyProfit = yearlyRevenue - yearlyCost;

    return {
      revenue: Number(yearlyRevenue.toFixed(2)),
      cost: Number(yearlyCost.toFixed(2)),
      profit: Number(yearlyProfit.toFixed(2)),
    };
  };

  const yearlyTotals = calculateYearlyTotals();

  // UI rendering for loading state
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg font-medium">Loading financial data...</div>
      </div>
    );
  }

  // UI rendering for error state
  if (loadingError) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-64">
        <div className="text-lg font-medium text-red-600 mb-4">
          {loadingError}
        </div>
        <button
          onClick={handleRefreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Accounting Management</h1>
        <button
          onClick={handleRefreshData}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Data summary section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Products for Sale</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Private Products</h3>
          <p className="text-3xl font-bold">{privateProducts.length}</p>
        </div>
      </section>

      {/* Year Selection */}
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Financial Reports</h2>
        <div>
          <label
            htmlFor="yearSelect"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Year:
          </label>
          <select
            id="yearSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {[currentYear - 2, currentYear - 1, currentYear].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Yearly summary stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-medium mb-2">
            Total Revenue ({selectedYear})
          </h3>
          <p className="text-3xl font-bold text-green-600">
            ${yearlyTotals.revenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-medium mb-2">
            Total Cost ({selectedYear})
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            ${yearlyTotals.cost.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-lg font-medium mb-2">
            Total Profit ({selectedYear})
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            ${yearlyTotals.profit.toFixed(2)}
          </p>
        </div>
      </section>

      {/* Monthly Report Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Monthly Report - {selectedYear}
          </h2>
        </div>

        {orders.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={allMonthsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => value.split(" ")[0]}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                name="Revenue"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                name="Cost"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#f59e0b"
                name="Profit"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-500 text-center py-8">
            No monthly data available for {selectedYear}
          </div>
        )}
      </section>

      {/* Yearly Report Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Yearly Report ({currentYear - 4}–{currentYear})
        </h2>
        {yearlyReports.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={yearlyReports}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                name="Revenue"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                name="Cost"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#f59e0b"
                name="Profit"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-500 text-center py-8">
            No yearly data available
          </div>
        )}
      </section>

      {/* Monthly Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold mr-4">Monthly Details</h2>
          <div>
            <label
              htmlFor="monthSelect"
              className="block text-sm font-medium text-gray-700 mr-2"
            >
              Month:
            </label>
            <select
              id="monthSelect"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {MONTH_NAMES.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(() => {
          // Filter orders for selected month
          const selectedMonthOrders = orders.filter((order) => {
            const orderDate = order.orderDate.toDate();
            return (
              orderDate.getMonth() === selectedMonth &&
              orderDate.getFullYear() === selectedYear
            );
          });

          if (selectedMonthOrders.length === 0) {
            return (
              <div className="text-gray-500 text-center py-8">
                No orders found for {MONTH_NAMES[selectedMonth]} {selectedYear}
              </div>
            );
          }

          // Calculate product sales statistics for selected month
          const allProductsMap = new Map();

          // Combine both product types into a single map for easier lookup
          [...products, ...privateProducts].forEach((product) => {
            allProductsMap.set(product.id, product);
          });

          // Get unique product IDs from orders for this month
          const uniqueProductIds = new Set();
          selectedMonthOrders.forEach((order) => {
            order.orderItems.forEach((item) => {
              uniqueProductIds.add(item.id);
            });
          });

          // Calculate stats for each product that was sold
          const productStats: {
            id: unknown;
            name: any;
            sales: number;
            revenue: number;
            profit: number;
            isPrivate: boolean;
          }[] = Array.from(uniqueProductIds)
            .map((productId) => {
              const product = allProductsMap.get(productId);

              if (!product) {
                // Handle case where product might be deleted or not found
                return null;
              }

              const sales = selectedMonthOrders.reduce((total, order) => {
                const orderItem = order.orderItems.find(
                  (item) => item.id === productId
                );
                return total + (orderItem ? orderItem.quantity : 0);
              }, 0);

              const revenue = selectedMonthOrders.reduce((total, order) => {
                const orderItem = order.orderItems.find(
                  (item) => item.id === productId
                );
                return (
                  total +
                  (orderItem
                    ? (orderItem.price - (orderItem.discount || 0)) *
                      orderItem.quantity
                    : 0)
                );
              }, 0);

              return {
                id: productId,
                name: product.name || productId,
                sales,
                revenue: Number(revenue.toFixed(2)),
                profit: Number((revenue - product.iniPrice * sales).toFixed(2)),
                isPrivate: privateProducts.some((p) => p.id === productId),
              };
            })
            .filter(Boolean);

          return (
            <div className="space-y-6">
              <div className="bg-gray-50 shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Order Summary
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Total orders: {selectedMonthOrders.length}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total Revenue
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        $
                        {selectedMonthOrders
                          .reduce((sum, order) => sum + order.totalAmount, 0)
                          .toFixed(2)}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total Discounts
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        $
                        {selectedMonthOrders
                          .reduce(
                            (sum, order) => sum + order.totaldiscountPrice,
                            0
                          )
                          .toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                Product Performance
              </h3>
              {productStats.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Units Sold
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenue
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productStats.map((stat, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stat.id as string}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {stat.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${stat.isPrivate ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
                            >
                              {stat.isPrivate ? "Private" : "For Sale"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {stat.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${stat.revenue.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${stat.profit.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  No product data available for this month
                </div>
              )}
            </div>
          );
        })()}
      </section>
    </div>
  );
};

export default AccountingPage;

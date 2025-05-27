"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { gsap } from "gsap";

// shadcn UI components
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import actions
import {
  Search,
  SearchCategory,
  SearchBlog as fns,
  lang,
  search_Team,
} from "@/lib/action/uploadimage";
import {
  SearchBlogsProps,
  SearchCategoryProps,
  searchProps,
  SearchTeamProps,
} from "@/lib/action";

// Icons
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { MdCategory } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { RiFileSearchLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

const SearchComponent = ({ type }: { type?: "dashboard" }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<searchProps[]>([]);
  const [searchBlog, setSearchBlog] = useState<SearchBlogsProps[]>([]);
  const [searchCategory, setSearchCategory] = useState<SearchCategoryProps[]>(
    []
  );
  const [searchTeam, setSearchTeam] = useState<SearchTeamProps[]>([]);
  const [search_by, setSearchBy] = useState<{ search: string[] }>({
    search: ["blog"],
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useUser();
  const t = useTranslations("search");
  const db = getFirestore(app);

  // Refs for animation
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  const backdropRef = useRef(null);

  // Animation setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin();
    }
  }, []);

  // Search input animation
  useEffect(() => {
    if (searchInputRef.current) {
      gsap.to(searchInputRef.current, {
        boxShadow:
          searchValue.length > 0
            ? "0 8px 32px rgba(0, 0, 0, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.08)",
        scale: searchValue.length > 0 ? 1.02 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [searchValue]);

  // Results animation
  useEffect(() => {
    if (resultsRef.current && show) {
      gsap.fromTo(
        resultsRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [show]);

  // Backdrop animation
  useEffect(() => {
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: searchValue.length > 0 ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
        display: searchValue.length > 0 ? "block" : "none",
      });
    }
  }, [searchValue]);

  const onChangeHandle = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      setFilteredData([]);
      setSearchBlog([]);
      setSearchCategory([]);
      setSearchTeam([]);
      setShow(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const debounceTimer = setTimeout(async () => {
      const results: {
        products?: searchProps[];
        blogs?: SearchBlogsProps[];
        categories?: SearchCategoryProps[];
        team?: SearchTeamProps[];
      } = {};

      try {
        // Run searches in parallel for better performance
        const promises = [];

        if (search_by.search.includes("product") || type === "dashboard") {
          promises.push(
            Search(value).then((data) => (results.products = data))
          );
        }
        if (search_by.search.includes("blog") || type === "dashboard") {
          promises.push(fns(value).then((data) => (results.blogs = data)));
        }
        if (search_by.search.includes("category") || type === "dashboard") {
          promises.push(
            SearchCategory(value).then((data) => (results.categories = data))
          );
        }
        if (search_by.search.includes("team_member") || type === "dashboard") {
          promises.push(
            search_Team(value).then((data) => (results.team = data))
          );
        }

        await Promise.all(promises);

        setFilteredData(results.products || []);
        setSearchBlog(results.blogs || []);
        setSearchCategory(results.categories || []);
        setSearchTeam(results.team || []);
        setShow(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  };

  useEffect(() => {
    const getData = async () => {
      let searchBy = { search: ["blog", "product"] };

      try {
        if (user) {
          const docSnapshot = await getDoc(
            doc(db, "searchSetting", user?.id || "")
          );
          if (docSnapshot.exists()) {
            searchBy = docSnapshot.data() as { search: string[] };
          }
        } else {
          const localData = localStorage.getItem("search");
          if (localData) {
            searchBy = JSON.parse(localData);
          }
        }
      } catch (error) {
        console.error("Error fetching search settings:", error);
      }
      setSearchBy(searchBy);
    };

    getData();
  }, [db, user]);

  const clearSearch = () => {
    setSearchValue("");
    setShow(false);
    setFilteredData([]);
    setSearchBlog([]);
    setSearchCategory([]);
    setSearchTeam([]);
  };

  // Helper function to check if search type should be shown
  const shouldShowSearchType = (searchType: string) => {
    return type === "dashboard" || search_by.search.includes(searchType);
  };

  // Count total results - show all for dashboard
  const totalResults =
    type === "dashboard"
      ? filteredData.length +
        searchBlog.length +
        searchCategory.length +
        searchTeam.length
      : (search_by.search.includes("product") ? filteredData.length : 0) +
        (search_by.search.includes("blog") ? searchBlog.length : 0) +
        (search_by.search.includes("category") ? searchCategory.length : 0) +
        (search_by.search.includes("team_member") ? searchTeam.length : 0);

  const renderSearchItem = (
    item: any,
    link: string,
    displayValue: string,
    extraValue?: string
  ) => (
    <Link
      href={link}
      onClick={() => {
        setSearchValue(displayValue);
        setShow(false);
      }}
      className="flex items-center justify-between p-3 hover:bg-secondary/5 transition-all duration-200 rounded-md"
    >
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {displayValue}
      </span>
      {extraValue && (
        <Badge variant="secondary" className="ml-2 text-white">
          {extraValue}
        </Badge>
      )}
    </Link>
  );

  return (
    <>
      <div
        ref={backdropRef}
        className="w-screen h-screen fixed top-0 left-0 right-0  opacity-0 z-[40]"
        onClick={clearSearch}
      ></div>

      <div
        ref={searchContainerRef}
        className="w-full relative md:flex mt-6 mb-4 justify-center px-5 items-center z-[500]"
      >
        <div className="flex relative group w-full md:max-w-2xl transition-all duration-300">
          <div
            ref={searchInputRef}
            className="w-full flex items-center relative rounded-full backdrop-blur-lg border-2 border-secondary shadow-lg overflow-hidden transition-all duration-300"
          >
            <div
              className={`absolute ${lang() === "ar" || lang() === "ku" ? "right-4" : "left-4"} top-1/2 transform -translate-y-1/2 text-secondary`}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SearchIcon className="h-5 w-5" />
              )}
            </div>

            <Input
              type="text"
              value={searchValue}
              onChange={(e) => onChangeHandle(e.target.value)}
              className={`
                ${lang() === "ar" || lang() === "ku" ? "text-right pr-12" : "text-left pl-12"} 
                w-full py-6 border-none rounded-full placeholder:text-gray-400
                dark:placeholder:text-gray-500 outline-none shadow-none bg-transparent
                ${lang() === "ar" || lang() === "ku" ? "pl-4" : "pr-12"}
                dark:text-white font-medium text-gray-700
              `}
              placeholder={t("Search")}
            />

            {searchValue && (
              <button
                onClick={clearSearch}
                className={`absolute ${lang() === "ar" || lang() === "ku" ? "left-4" : "right-4"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors`}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div
            ref={resultsRef}
            className={`absolute w-full bg-white dark:bg-neutral-800 shadow-2xl rounded-xl border border-gray-200 dark:border-neutral-700 mt-16 z-[100] overflow-hidden transition-all duration-300 ${
              show && searchValue.length
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          >
            {show && searchValue.length > 0 ? (
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      {t("Results")}
                    </CardTitle>
                    <Badge variant="outline">{totalResults}</Badge>
                  </div>
                </CardHeader>

                <Tabs
                  defaultValue="all"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="px-4">
                    <TabsList className="w-full grid grid-cols-5 h-auto p-1">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                      >
                        {t("All")}
                      </TabsTrigger>

                      {shouldShowSearchType("category") && (
                        <TabsTrigger
                          value="category"
                          className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                          disabled={searchCategory.length === 0}
                        >
                          {t("category")}
                        </TabsTrigger>
                      )}

                      {shouldShowSearchType("product") && (
                        <TabsTrigger
                          value="product"
                          className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                          disabled={filteredData.length === 0}
                        >
                          {t("product")}
                        </TabsTrigger>
                      )}

                      {shouldShowSearchType("team_member") && (
                        <TabsTrigger
                          value="team"
                          className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                          disabled={searchTeam.length === 0}
                        >
                          {t("team")}
                        </TabsTrigger>
                      )}

                      {shouldShowSearchType("blog") && (
                        <TabsTrigger
                          value="blog"
                          className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                          disabled={searchBlog.length === 0}
                        >
                          {t("blog")}
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>

                  <CardContent className="pt-4">
                    <TabsContent value="all" className="m-0">
                      <ScrollArea className="h-[400px] pr-4">
                        {shouldShowSearchType("category") &&
                          searchCategory.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2 bg-secondary/5 p-2 rounded-md">
                                <MdCategory
                                  size={18}
                                  className="text-secondary"
                                />
                                <h3 className="font-medium text-sm">
                                  {t("category")}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="ml-auto text-white"
                                >
                                  {searchCategory.length}
                                </Badge>
                              </div>
                              {searchCategory.map((item) =>
                                renderSearchItem(
                                  item,
                                  `/products/${item.name}`,
                                  item.name,
                                  item.numberOfSearches.toString()
                                )
                              )}
                              <Separator className="my-4" />
                            </div>
                          )}

                        {shouldShowSearchType("product") &&
                          filteredData.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2 bg-secondary/5 p-2 rounded-md">
                                <RiFileSearchLine
                                  size={18}
                                  className="text-secondary"
                                />
                                <h3 className="font-medium text-sm">
                                  {t("product")}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="ml-auto text-white"
                                >
                                  {filteredData.length}
                                </Badge>
                              </div>
                              {filteredData.map((item) =>
                                renderSearchItem(
                                  item,
                                  `/products/${item.category}/${item.id}`,
                                  item.name,
                                  item.numSearch.toFixed(0)
                                )
                              )}
                              <Separator className="my-4" />
                            </div>
                          )}

                        {shouldShowSearchType("team_member") &&
                          searchTeam.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2 bg-secondary/5 p-2 rounded-md">
                                <FaUserFriends
                                  size={16}
                                  className="text-secondary"
                                />
                                <h3 className="font-medium text-sm">
                                  {t("team")}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="ml-auto text-white"
                                >
                                  {searchTeam.length}
                                </Badge>
                              </div>
                              {searchTeam.map((item) =>
                                renderSearchItem(
                                  item,
                                  "/About#" + item.fullName,
                                  item.fullName,
                                  item.numOfSearch.toFixed(0)
                                )
                              )}
                              <Separator className="my-4" />
                            </div>
                          )}

                        {shouldShowSearchType("blog") &&
                          searchBlog.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2 bg-secondary/5 p-2 rounded-md">
                                <FaBlog size={16} className="text-secondary" />
                                <h3 className="font-medium text-sm">
                                  {t("blog")}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="ml-auto text-white"
                                >
                                  {searchBlog.length}
                                </Badge>
                              </div>
                              {searchBlog.map((item) =>
                                renderSearchItem(
                                  item,
                                  `/blog/${item.id}`,
                                  item.name,
                                  item.numberOfSearches.toFixed(0)
                                )
                              )}
                            </div>
                          )}

                        {totalResults === 0 && (
                          <div className="flex flex-col items-center justify-center h-[200px]">
                            <SearchIcon className="h-12 w-12 text-gray-300 mb-4" />
                            <p className="text-gray-500">
                              {t("messageNotFound")}
                            </p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="category" className="m-0">
                      <ScrollArea className="h-[400px] pr-4">
                        {searchCategory.length > 0 ? (
                          searchCategory.map((item) =>
                            renderSearchItem(
                              item,
                              `/products/${item.name}`,
                              item.name,
                              item.numberOfSearches.toString()
                            )
                          )
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[200px]">
                            <MdCategory
                              size={48}
                              className="text-gray-300 mb-4"
                            />
                            <p className="text-gray-500">{t("Category")}</p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="product" className="m-0">
                      <ScrollArea className="h-[400px] pr-4">
                        {filteredData.length > 0 ? (
                          filteredData.map((item) =>
                            renderSearchItem(
                              item,
                              `/products/${item.category}/${item.id}`,
                              item.name,
                              item.numSearch.toFixed(0)
                            )
                          )
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[200px]">
                            <RiFileSearchLine
                              size={48}
                              className="text-gray-300 mb-4"
                            />
                            <p className="text-gray-500">{t("Products")}</p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="team" className="m-0">
                      <ScrollArea className="h-[400px] pr-4">
                        {searchTeam.length > 0 ? (
                          searchTeam.map((item) =>
                            renderSearchItem(
                              item,
                              "/About#" + item.fullName,
                              item.fullName,
                              item.numOfSearch.toFixed(0)
                            )
                          )
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[200px]">
                            <FaUserFriends
                              size={48}
                              className="text-gray-300 mb-4"
                            />
                            <p className="text-gray-500">{t("Team Member")}</p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="blog" className="m-0">
                      <ScrollArea className="h-[400px] pr-4">
                        {searchBlog.length > 0 ? (
                          searchBlog.map((item) =>
                            renderSearchItem(
                              item,
                              `/blog/${item.id}`,
                              item.name,
                              item.numberOfSearches.toFixed(0)
                            )
                          )
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[200px]">
                            <FaBlog size={48} className="text-gray-300 mb-4" />
                            <p className="text-gray-500">{t("Blogs")}</p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            ) : !search_by.search.length && type !== "dashboard" ? (
              <p className="px-4 py-6 w-full text-center text-neutral-500 dark:text-neutral-400">
                {t("allowSearch")}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

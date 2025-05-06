"use client";
import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import Link from "next/link";
import { getBlog, getBlogs } from "@/lib/action/uploadimage";
import BlogRow from "@/components/blog/BlogRow";
import { useUser } from "@clerk/nextjs";
// import C from "@/components/blog/C";
import {
  addFavoriteBlog,
  deleteSave,
  getallsaveid,
} from "@/lib/action/fovarit";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/[locale]/ClientProviders";
const Page = ({ params }) => {
  const { toast } = useToast();
  const t = useTranslations("blog");
  const iduse: any = React.use(params);
  const id = iduse.id;
  const { data, isLoading } = useQuery({
    queryKey: [params],
    queryFn: async ({ pageParam }) => {
      const data = await getBlog(id);
      const blogList = await getBlogs();
      const getid = await getallsaveid(user?.id);
      return { blog: data, blogs: blogList, idSave: getid };
    },
  });

  const { user } = useUser();

  if (!isLoading)
    return (
      <div className="flex flex-col lg:flex-row py-9 px-3 md:px-12 gap-4 w-full">
        {/* Main Content Section */}
        <main className="flex flex-col w-full lg:w-[65%] gap-6">
          {/* Breadcrumb */}
          <motion.span
            className="text-sm font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-blue-600">
              {t("home")}
            </Link>
            &gt;
            <Link href="/blog" className="hover:text-blue-600">
              {t("blog")}
            </Link>
          </motion.span>

          {/* Blog Content */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl font-bold"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {data.blog.title}
            </motion.h2>
            <motion.p
              className="text-neutral-500 text-sm"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              By {data.blog.user} on{" "}
              {new Date(data.blog.date).toLocaleDateString()}
            </motion.p>

            {/* Conditional Rendering for Video or Image */}
            {data.blog.type === "video" ? (
              <motion.div
                className="w-full aspect-video"
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ReactPlayer
                  url={data.blog.video}
                  width="100%"
                  height="100%"
                  controls
                  className="rounded-xl overflow-hidden"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={data.blog.image}
                  alt="Blog Cover"
                  width={900}
                  height={400}
                  className="object-cover shadow-lg rounded-xl w-full max-h-[450px]"
                />
              </motion.div>
            )}

            <motion.p
              className="text-sm leading-relaxed text-neutral-600"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {data.blog.description} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Amet, facilis. Fugiat tenetur vero ullam quasi
              aliquid vel, in fugit aperiam autem quas! Optio vel, quam labore
              omnis consectetur reiciendis consequatur doloribus adipisci
              voluptatibus mollitia itaque quo, reprehenderit aperiam
              praesentium saepe similique sapiente eum. Quam, aliquam earum,
              illum deleniti quo beatae consequuntur dolorum eos reiciendis
              aperiam ipsa molestias deserunt rem?
            </motion.p>

            {/* Footer Buttons */}
            <motion.footer
              className="flex w-full gap-4 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.button
                disabled={data.idSave.includes(id) || !user}
                onClick={async () => {
                  try {
                    await addFavoriteBlog({
                      item: {
                        blogId: id,
                        description: data.blog.description,
                        id: id,
                        numberOffavorites: data.blog.numberOffavorites,
                        title: data.blog.title,
                        type: data.blog.type,
                        userId: user?.id || "",
                        image: data.blog.image || "",
                        video: data.blog.video || "",
                      },
                    });
                    queryClient.setQueryData([params], (pldData: any) => {
                      if (!pldData) return pldData;
                      return { ...pldData, idSave: [id, ...pldData.idSave] };
                    });
                    // setidSave((pre) => [...pre, id]);
                    toast({ title: "Blog saved successfully!" });
                  } catch (error) {
                    toast({ title: "Failed to save blog" });
                  }
                }}
                className="px-6 py-1 disabled:bg-blue-300 w-[180px] rounded-lg active:bg-blue-600 duration-300 transition-all md:hover:bg-blue-600 text-white bg-blue-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("save")}
              </motion.button>

              <motion.button
                disabled={!data.idSave.includes(id) || !user}
                onClick={async () => {
                  try {
                    await deleteSave({
                      id,
                      numberOffavorites: data.blog.numberOffavorites,
                      userId: user?.id,
                    });
                    queryClient.setQueryData([params], (pldData: any) => {
                      if (!pldData) return pldData;
                      return {
                        ...pldData,
                        idSave: pldData.idSave.filter(
                          (Itemid) => Itemid !== id
                        ),
                      };
                    });
                    // setidSave((pre) => pre.filter((item) => item !== id));
                    toast({ title: "Blog removed successfully!" });
                  } catch (error) {
                    toast({ title: "Failed to remove blog" });
                  }
                }}
                className="px-6 disabled:text-blue-300 py-1 w-[180px] active:bg-blue-100 duration-300 transition-all md:hover:bg-blue-100 rounded-lg border text-blue-700 border-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("unsave")}
              </motion.button>
            </motion.footer>
          </motion.div>
        </main>
        {/* Comment and Like Section */}
        {/* <div className="flex cursor-pointer justify-end gap-4 px-10">
          <div className="flex gap-2 hover:bg-blue-500 duration-300 transition-all px-2 rounded-md items-center">
            <LiaCommentDots />
            <span className="text-14">12 Comments</span>
          </div>
          <div className="flex hover:bg-blue-500 duration-300 transition-all px-2 rounded-md gap-2 items-center">
            {true ? <BiSolidLike color="blue" /> : <AiOutlineLike />}
            <span className="text-14">123 Likes</span>
          </div>
        </div> */}
        {/* Comments Section */}
        {/* <C blogId={id} /> */}
        {/* Sidebar Section */}
        <aside className="flex flex-col lg:w-[35%] w-full gap-4">
          <motion.div
            className="w-full p-4 bg-white gap-4 flex flex-col justify-center items-center shadow-md rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h3
              className="text-lg font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t("Related_Blogs")}
            </motion.h3>

            <motion.div
              className="flex flex-col gap-4 w-full"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delayChildren: 0.4,
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {data.blogs
                .filter((item) => item.type === "image")
                .map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 50, x: 50 },
                      visible: { opacity: 1, y: 0, x: 0 },
                    }}
                  >
                    <BlogRow item={item} />
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </aside>
      </div>
    );
  return;
};

export default Page;

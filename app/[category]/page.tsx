"use client";

import React, { useState } from "react";
import { Calendar, Clock, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from "@/components/ui/pagination";

const NewsCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const totalPages = 5; // Giả sử có 5 trang

  const featuredArticle = {
    id: 1,
    title: "Những xu hướng công nghệ định hình tương lai 2025",
    excerpt:
      "Khám phá những công nghệ đột phá đang thay đổi cách chúng ta sống và làm việc, từ AI đến blockchain và metaverse.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    category: "Công nghệ",
    author: "Nguyễn Văn A",
    date: "09/12/2024",
    readTime: "8 phút đọc",
    views: "12.5K",
  };

  const articles = [
    {
      id: 2,
      title: "AI và Machine Learning: Cách mạng trong phân tích dữ liệu",
      excerpt:
        "Tìm hiểu cách các doanh nghiệp đang sử dụng AI để tối ưu hóa quy trình kinh doanh.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      category: "AI & ML",
      author: "Trần Thị B",
      date: "08/12/2024",
      readTime: "6 phút đọc",
      views: "8.2K",
    },
    {
      id: 3,
      title: "Blockchain không chỉ là tiền điện tử",
      excerpt:
        "Các ứng dụng thực tế của blockchain trong chuỗi cung ứng và tài chính.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      category: "Blockchain",
      author: "Lê Văn C",
      date: "07/12/2024",
      readTime: "5 phút đọc",
      views: "6.8K",
    },
    {
      id: 4,
      title: "Cybersecurity: Bảo vệ dữ liệu trong kỷ nguyên số",
      excerpt:
        "Những thách thức an ninh mạng mà các tổ chức đang phải đối mặt.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      category: "Bảo mật",
      author: "Phạm Thị D",
      date: "06/12/2024",
      readTime: "7 phút đọc",
      views: "9.1K",
    },
    {
      id: 5,
      title: "5G và IoT: Kết nối mọi thứ",
      excerpt:
        "Làm thế nào 5G đang thúc đẩy sự phát triển của Internet of Things.",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
      category: "Network",
      author: "Hoàng Văn E",
      date: "05/12/2024",
      readTime: "6 phút đọc",
      views: "7.5K",
    },
    {
      id: 6,
      title: "Cloud Computing: Tương lai của lưu trữ dữ liệu",
      excerpt: "Xu hướng chuyển đổi sang đám mây và lợi ích cho doanh nghiệp.",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      category: "Cloud",
      author: "Vũ Thị F",
      date: "04/12/2024",
      readTime: "5 phút đọc",
      views: "6.3K",
    },
    {
      id: 7,
      title: "DevOps: Tối ưu hóa quy trình phát triển phần mềm",
      excerpt:
        "Cách DevOps giúp các team phát triển nhanh hơn và hiệu quả hơn.",
      image:
        "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=400&h=300&fit=crop",
      category: "DevOps",
      author: "Nguyễn Thị G",
      date: "03/12/2024",
      readTime: "6 phút đọc",
      views: "5.9K",
    },
  ];

  const smallArticles = articles.slice(0, 2); // 2 item bên phải
  const otherArticles = articles.slice(2); // còn lại → grid 4 cột

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-white from-slate-50 to-slate-100 px-8 gap-4 flex flex-col gap-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
        <h2 className="text-3xl font-bold text-slate-900">Công nghệ</h2>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border hover:bg-opacity-100 transition-shadow">
            <div className="relative h-96">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-3 leading-tight group-hover:text-blue-600">
                  {featuredArticle.title}{" "}
                </h2>
                <p className="text-slate-200 mb-4 text-lg">
                  {featuredArticle.excerpt}{" "}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span>{featuredArticle.author}</span>{" "}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {featuredArticle.date}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          {smallArticles.map((a) => (
            <Card
              key={a.id}
              className="overflow-hidden cursor-pointer group flex flex-row h-40"
            >
              <div className="w-40 h-full flex-shrink-0 overflow-hidden">
                <img
                  src={a.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt={a.title}
                />
              </div>

              <CardHeader className="p-1 flex flex-col justify-center flex-1">
                <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition">
                  {a.title}
                </CardTitle>

                <CardDescription className="text-sm line-clamp-2 mt-1 text-slate-600">
                  {a.excerpt}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {otherArticles.map((a) => (
          <Card key={a.id} className="overflow-hidden cursor-pointer group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition">
                {a.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {a.excerpt}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 mb-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default NewsCategory;

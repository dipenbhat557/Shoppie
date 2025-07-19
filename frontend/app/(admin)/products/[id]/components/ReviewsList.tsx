"use client";

import { useState } from "react";
import { Star, Search, ChevronDown, Flag, ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
  reported: boolean;
  user: {
    name: string;
    avatar: string;
  };
  reply?: {
    comment: string;
    date: Date;
  };
}

// Mock data
const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Great product! The quality is exceptional and it arrived quickly.",
    date: new Date("2024-03-15"),
    helpful: 12,
    reported: false,
    user: {
      name: "John Doe",
      avatar: "/avatars/john.png"
    },
    reply: {
      comment: "Thank you for your feedback! We're glad you enjoyed the product.",
      date: new Date("2024-03-16")
    }
  },
  {
    id: 2,
    rating: 3,
    comment: "Product is okay but the sizing runs small.",
    date: new Date("2024-03-14"),
    helpful: 8,
    reported: true,
    user: {
      name: "Jane Smith",
      avatar: "/avatars/jane.png"
    }
  },
  // Add more mock reviews...
];

export function ReviewsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredAndSortedReviews = mockReviews
    .filter(review => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return review.comment.toLowerCase().includes(query) ||
               review.user.name.toLowerCase().includes(query);
      }
      if (filterRating) {
        return review.rating === filterRating;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.date.getTime() - a.date.getTime();
        case "rating":
          return b.rating - a.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  const ratingCounts = mockReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= averageRating ? 'text-[#FFC633] fill-[#FFC633]' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({mockReviews.length} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <button
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className={`flex items-center gap-1 ${filterRating === rating ? 'text-[#FFC633]' : 'text-gray-600'}`}
                >
                  <span className="w-3">{rating}</span>
                  <Star className={`w-4 h-4 ${filterRating === rating ? 'fill-[#FFC633]' : ''}`} />
                </button>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFC633]"
                    style={{
                      width: `${((ratingCounts[rating] || 0) / mockReviews.length) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10">{ratingCounts[rating] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 md:max-w-xs">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "rating" | "helpful")}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
        >
          <option value="recent">Most Recent</option>
          <option value="rating">Highest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={review.user.avatar}
                    alt={review.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{review.user.name}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'text-[#FFC633] fill-[#FFC633]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                  
                  {review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">Store Response</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.reply.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{review.reply.comment}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.helpful}</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Flag className={`w-4 h-4 ${review.reported ? 'text-red-500' : ''}`} />
                </button>
                {!review.reply && (
                  <button className="text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
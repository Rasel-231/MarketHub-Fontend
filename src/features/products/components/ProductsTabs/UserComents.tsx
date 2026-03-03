"use client";

import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetReviewsQuery } from "@/store/api/reviewApi/reviewApi";
import { MessageSquareText, Star, UserCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import WriteReview from "./WriteReview";

const UserComments = () => {
  const params = useParams();
  const productId = params.id as string;
  console.log("Current Product ID:", productId);

  const { data: reviewResponse, isLoading } = useGetReviewsQuery(productId);
  console.log("API Response:", reviewResponse);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviews = Array.isArray(reviewResponse?.data)
    ? reviewResponse.data
    : [];

  console.log("Processed Reviews:", reviews);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto my-12">
      <div className="flex items-center justify-between gap-3 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <MessageSquareText className="text-zinc-400" size={28} />
          <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tighter">
            Reviews({reviews?.length})
          </h2>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="border border-indigo-500 p-2 w-32 text-center bg-slate-50 text-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600"
        >
          {showReviewForm ? "Close" : "Write a review"}
        </button>
      </div>

      {showReviewForm && (
        <div className="mb-10">
          <WriteReview productId={productId} />
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => {
          const userImage = review.user?.seller?.profilePhoto;
          console.log("UserImage",review?.user?.seller?.profilePhoto);

          return (
            <div
              key={review.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-700 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={review.user?.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserCircle className="text-zinc-400" size={32} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                      {review?.user?.name || "Anonymous"}
                    </h4>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={`${
                        index < (review.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                {review.comment}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserComments;

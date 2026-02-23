export interface IReview {
    rating: number;
}
export const getRatingStats = (reviews: IReview[]) => {
    const totalReviews = reviews?.length || 0;
    const averageRating = totalReviews > 0
        ? reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews
        : 0;

    return {
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews
    };
};
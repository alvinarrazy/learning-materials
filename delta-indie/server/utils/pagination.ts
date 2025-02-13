import type { Model, RootFilterQuery } from 'mongoose';

export async function getPaginatedItems<T extends Model<any>>(
  Entity: T,
  options: {
    filter?: RootFilterQuery<any>;
    page: number;
    limit?: number;
  },
) {
  try {
    const { filter = {}, page, limit = 10 } = options;
    const skip = (page - 1) * limit;

    // Fetch the paginated results
    const items = await Entity.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    const totalDocuments = await Entity.countDocuments();

    return {
      items,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching paginated items:', error);
    throw error;
  }
}

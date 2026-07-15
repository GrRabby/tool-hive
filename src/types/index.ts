export type ToolCategory =
  | "power-tools"
  | "garden"
  | "camping"
  | "party-events"
  | "electronics"
  | "other";

export type ToolCondition = "new" | "good" | "fair";

export interface Owner {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Tool {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ToolCategory;
  dailyRate: number;
  condition: ToolCondition;
  location: string;
  rating: number;
  imageUrl: string;
  ownerId: string;
  owner?: Owner | null;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ToolListResponse {
  tools: Tool[];
  pagination: Pagination;
}

export interface PublicStats {
  totalTools: number;
  totalCategories: number;
  totalLocations: number;
}

export interface CategoryCount {
  category: ToolCategory;
  count: number;
}

export interface AdminStats {
  totalTools: number;
  categoryCounts: CategoryCount[];
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  "power-tools": "Power Tools",
  garden: "Garden",
  camping: "Camping",
  "party-events": "Party & Events",
  electronics: "Electronics",
  other: "Other",
};

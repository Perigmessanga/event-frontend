import { get } from "@/lib/api-client";
import type { AdminOrder, PaginatedResponse, AdminSales, AdvancedSales} from "@/types/admin";

export const getAdminOrders = (params: string) =>
  get<PaginatedResponse<AdminOrder>>(`/admin/orders/${params}`);



export const getAdvancedSales = (params: string) =>
  get<AdvancedSales>(`/events/admin/sales/${params}`);

export const getAdminSales = () =>
  get<AdminSales>("/events/admin/sales/"); // <-- mettre /events/admin/sales
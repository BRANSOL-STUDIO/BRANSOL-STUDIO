/**
 * BRANSOL — TypeScript types (aligned with Supabase schema)
 */

export type OrgStatus = "active" | "pending" | "overdue";
export type UserRole = "client" | "admin" | "super_admin";
export type ProjectStatus = "active" | "pending" | "review" | "complete";
export type DeliverableStatus = "review" | "approved" | "changes";
export type InvoiceStatus = "pending" | "paid";
export type QuoteStatus = "open" | "accepted" | "expired" | "declined";
export type QuoteScopeType = "inclusion" | "exclusion";

export interface Organisation {
  id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  sector: string | null;
  status: OrgStatus;
  tier: string | null;
  mrr: number | null;
  vat_number: string | null;
  address: string | null;
  renewal_date: string | null;
  joined_date: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  organisation_id: string | null;
  avatar: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  organisation_id: string;
  title: string;
  scope: string | null;
  status: ProjectStatus;
  progress: number;
  milestone: string | null;
  due_date: string | null;
  started_date: string | null;
  color: string;
  created_at: string;
}

export interface ProjectPhase {
  id: string;
  project_id: string;
  label: string;
  phase_date: string | null;
  done: boolean;
  active: boolean;
  sort_order: number;
}

export interface Deliverable {
  id: string;
  project_id: string;
  organisation_id: string;
  name: string;
  file_type: string | null;
  file_size: string | null;
  file_url: string | null;
  version: string;
  uploaded_by: string | null;
  note: string | null;
  status: DeliverableStatus;
  approved_date: string | null;
  created_at: string;
}

export interface DeliverableComment {
  id: string;
  deliverable_id: string;
  author_id: string;
  text: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  organisation_id: string;
  status: InvoiceStatus;
  date: string | null;
  due_date: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  name: string;
  description: string | null;
  quantity: number;
  rate: number;
  sort_order: number;
}

export interface Quote {
  id: string;
  organisation_id: string;
  status: QuoteStatus;
  date: string | null;
  valid_until: string | null;
  estimated_start: string | null;
  estimated_duration: string | null;
  scope_title: string | null;
  scope_description: string | null;
  notes: string | null;
  accepted_by: string | null;
  accepted_at: string | null;
  created_by: string | null;
  created_at: string;
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  name: string;
  description: string | null;
  quantity: number;
  rate: number;
  optional: boolean;
  sort_order: number;
}

export interface QuoteScope {
  id: string;
  quote_id: string;
  type: QuoteScopeType;
  text: string;
  sort_order: number;
}

export interface File {
  id: string;
  organisation_id: string;
  project_id: string | null;
  name: string;
  file_type: string | null;
  file_size: string | null;
  file_url: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Activity {
  id: string;
  organisation_id: string;
  text: string;
  actor_id: string | null;
  created_at: string;
}

export interface Note {
  id: string;
  organisation_id: string;
  author_id: string;
  text: string;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content_json: any;
  status: 'draft' | 'published' | 'archived';
  meta_description?: string;
  meta_keywords?: string[];
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Section {
  id: string;
  page_id: string;
  type: 'text' | 'image' | 'hero' | 'grid' | 'form' | 'custom';
  config_json: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Block {
  id: string;
  section_id: string;
  content: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Revision {
  id: string;
  page_id: string;
  content_json: any;
  created_at: string;
  created_by?: string;
  comment?: string;
}

export interface Form {
  id: string;
  slug: string;
  title: string;
  fields_json: FormField[];
  submissions_table_ref?: string;
  settings_json: any;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'number' | 'checkbox' | 'radio';
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: any;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  data: any;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  image_url?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// React Page Cell Types
export interface CellPlugin {
  id: string;
  version: number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  Renderer: React.ComponentType<any>;
  createInitialData?: () => any;
}

export interface PageBuilderContent {
  id: string;
  version: number;
  rows: Row[];
}

export interface Row {
  id: string;
  cells: Cell[];
}

export interface Cell {
  id: string;
  plugin: CellPlugin;
  dataI18n?: any;
  rows?: Row[];
  size?: number;
  inline?: string;
}


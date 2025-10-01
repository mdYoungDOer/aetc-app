import { createClient } from '@supabase/supabase-js';
import { Page, Section, Block, Revision, Form, FormSubmission, Speaker } from '@/types/cms';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Pages
export async function getPages(status?: string) {
  let query = supabase.from('pages').select('*').order('updated_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Page[];
}

export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  
  if (error) throw error;
  return data as Page;
}

export async function getPageById(id: string) {
  const { data, error} = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Page;
}

export async function createPage(page: Partial<Page>) {
  const { data, error } = await supabase
    .from('pages')
    .insert([page])
    .select()
    .single();
  
  if (error) throw error;
  return data as Page;
}

export async function updatePage(id: string, updates: Partial<Page>) {
  const { data, error } = await supabase
    .from('pages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Page;
}

export async function deletePage(id: string) {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Sections
export async function getSectionsByPageId(pageId: string) {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('page_id', pageId)
    .order('order_index');
  
  if (error) throw error;
  return data as Section[];
}

export async function createSection(section: Partial<Section>) {
  const { data, error } = await supabase
    .from('sections')
    .insert([section])
    .select()
    .single();
  
  if (error) throw error;
  return data as Section;
}

export async function updateSection(id: string, updates: Partial<Section>) {
  const { data, error } = await supabase
    .from('sections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Section;
}

// Revisions
export async function createRevision(pageId: string, contentJson: any, comment?: string) {
  const { data, error } = await supabase
    .from('revisions')
    .insert([{
      page_id: pageId,
      content_json: contentJson,
      comment,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as Revision;
}

export async function getRevisionsByPageId(pageId: string) {
  const { data, error } = await supabase
    .from('revisions')
    .select('*')
    .eq('page_id', pageId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Revision[];
}

// Forms
export async function getForms() {
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Form[];
}

export async function getFormBySlug(slug: string) {
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();
  
  if (error) throw error;
  return data as Form;
}

export async function createForm(form: Partial<Form>) {
  const { data, error } = await supabase
    .from('forms')
    .insert([form])
    .select()
    .single();
  
  if (error) throw error;
  return data as Form;
}

export async function updateForm(id: string, updates: Partial<Form>) {
  const { data, error } = await supabase
    .from('forms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Form;
}

export async function submitForm(formId: string, data: any, ipAddress?: string, userAgent?: string) {
  const { data: submission, error } = await supabase
    .from('form_submissions')
    .insert([{
      form_id: formId,
      data,
      ip_address: ipAddress,
      user_agent: userAgent,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return submission as FormSubmission;
}

// Speakers
export async function getSpeakers(featuredOnly: boolean = false) {
  let query = supabase.from('speakers').select('*').order('order_index');
  
  if (featuredOnly) {
    query = query.eq('featured', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Speaker[];
}

export async function createSpeaker(speaker: Partial<Speaker>) {
  const { data, error } = await supabase
    .from('speakers')
    .insert([speaker])
    .select()
    .single();
  
  if (error) throw error;
  return data as Speaker;
}

export async function updateSpeaker(id: string, updates: Partial<Speaker>) {
  const { data, error } = await supabase
    .from('speakers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Speaker;
}

export async function deleteSpeaker(id: string) {
  const { error } = await supabase
    .from('speakers')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}


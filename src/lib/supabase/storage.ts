import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class SupabaseStorageService {
  private bucketName = 'aetc-assets';

  async uploadImage(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    return this.getPublicUrl(data.path);
  }

  async uploadDocument(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload document: ${error.message}`);
    }

    return this.getPublicUrl(data.path);
  }

  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async deleteFile(path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async listFiles(folder?: string): Promise<any[]> {
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .list(folder);

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }

    return data || [];
  }
}

export const storageService = new SupabaseStorageService();

// Pre-configured image URLs for faster loading
export const AETC_IMAGES = {
  hero: '/Images/AETC 2025 PICS 1-24.JPG',
  programme: '/Images/AETC 2025 PICS 1-69.JPG',
  speakers: '/Images/AETC 2025 PICS 1-77 (1).JPG',
  registration: '/Images/AETC 2025 PICS 1-59 (1).JPG',
  venue: '/Images/AETC 2025 PICS 1-67.JPG',
  sponsors: '/Images/AETC 2025 PICS 1-57.JPG',
  news: '/Images/AETC 2025 PICS 1-49.JPG',
  contact: '/Images/AETC 2025 PICS 1-42 (1).JPG',
  about: '/Images/AETC 2025 PICS 1-24.JPG',
} as const;

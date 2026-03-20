export type InstallerTier = 'free' | 'pro'

export interface Installer {
  id: string
  name: string
  slug: string
  org_number: string | null
  region: string
  cities: string[]
  email: string
  phone: string | null
  website: string | null
  brands: string[]
  certifications: string[]
  description: string | null
  logo_url: string | null
  verified: boolean
  featured: boolean
  active: boolean
  tier: InstallerTier
  created_at: string
  updated_at: string
}

// For INSERT — id, timestamps, and defaults are optional
export type InstallerInsert = Omit<Installer, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  slug?: string
  cities?: string[]
  brands?: string[]
  certifications?: string[]
  verified?: boolean
  featured?: boolean
  active?: boolean
  tier?: InstallerTier
}

// For UPDATE — all fields optional except id
export type InstallerUpdate = Partial<Omit<Installer, 'id' | 'created_at'>> & {
  updated_at?: string
}

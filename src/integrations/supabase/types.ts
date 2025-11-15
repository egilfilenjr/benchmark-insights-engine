export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      benchmarks: {
        Row: {
          created_at: string | null
          id: string
          industry: string
          metadata: Json | null
          metric_name: string
          metric_value: number
          percentile_25: number | null
          percentile_50: number | null
          percentile_75: number | null
          platform: string | null
          sample_size: number | null
          subcategory: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
          percentile_25?: number | null
          percentile_50?: number | null
          percentile_75?: number | null
          platform?: string | null
          sample_size?: number | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          industry?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
          percentile_25?: number | null
          percentile_50?: number | null
          percentile_75?: number | null
          platform?: string | null
          sample_size?: number | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          clicks: number | null
          company_id: string | null
          conversions: number | null
          cpa: number | null
          created_at: string | null
          ctr: number | null
          external_id: string | null
          id: string
          impressions: number | null
          metadata: Json | null
          name: string
          platform: string
          provider: string
          roas: number | null
          spend: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          clicks?: number | null
          company_id?: string | null
          conversions?: number | null
          cpa?: number | null
          created_at?: string | null
          ctr?: number | null
          external_id?: string | null
          id?: string
          impressions?: number | null
          metadata?: Json | null
          name: string
          platform: string
          provider: string
          roas?: number | null
          spend?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          clicks?: number | null
          company_id?: string | null
          conversions?: number | null
          cpa?: number | null
          created_at?: string | null
          ctr?: number | null
          external_id?: string | null
          id?: string
          impressions?: number | null
          metadata?: Json | null
          name?: string
          platform?: string
          provider?: string
          roas?: number | null
          spend?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          domain: string | null
          id: string
          name: string
          owner_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_industries: {
        Row: {
          category: string
          company_id: string | null
          created_at: string | null
          detail: string | null
          domain: string | null
          id: string
          subcategory: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string | null
          detail?: string | null
          domain?: string | null
          id?: string
          subcategory?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string | null
          detail?: string | null
          domain?: string | null
          id?: string
          subcategory?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_industries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ga_accounts: {
        Row: {
          created_at: string | null
          display_name: string
          id: string
          region_code: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id: string
          region_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: string
          region_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ga4_daily: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          company_id: string | null
          conversions: number | null
          created_at: string | null
          date: string
          id: string
          metadata: Json | null
          new_users: number | null
          pageviews: number | null
          property_id: string
          revenue: number | null
          sessions: number | null
          updated_at: string | null
          user_id: string | null
          users: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          company_id?: string | null
          conversions?: number | null
          created_at?: string | null
          date: string
          id?: string
          metadata?: Json | null
          new_users?: number | null
          pageviews?: number | null
          property_id: string
          revenue?: number | null
          sessions?: number | null
          updated_at?: string | null
          user_id?: string | null
          users?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          company_id?: string | null
          conversions?: number | null
          created_at?: string | null
          date?: string
          id?: string
          metadata?: Json | null
          new_users?: number | null
          pageviews?: number | null
          property_id?: string
          revenue?: number | null
          sessions?: number | null
          updated_at?: string | null
          user_id?: string | null
          users?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ga4_daily_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          property_id: string | null
          property_name: string | null
          provider: string
          refresh_token: string | null
          status: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          property_id?: string | null
          property_name?: string | null
          provider: string
          refresh_token?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          property_id?: string | null
          property_name?: string | null
          provider?: string
          refresh_token?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oauth_accounts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          onboarding_step: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          onboarding_step?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          onboarding_step?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sync_logs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_details: string | null
          id: string
          message: string | null
          provider: string
          records_synced: number | null
          started_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_details?: string | null
          id?: string
          message?: string | null
          provider: string
          records_synced?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_details?: string | null
          id?: string
          message?: string | null
          provider?: string
          records_synced?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          last_active: string | null
          role: string | null
          status: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_active?: string | null
          role?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_active?: string | null
          role?: string | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          plan: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          plan?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          plan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          company_name: string | null
          created_at: string | null
          goals: string[] | null
          id: string
          industry: string | null
          onboarding_step: number | null
          owner_id: string | null
          timezone: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          goals?: string[] | null
          id?: string
          industry?: string | null
          onboarding_step?: number | null
          owner_id?: string | null
          timezone?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          goals?: string[] | null
          id?: string
          industry?: string | null
          onboarding_step?: number | null
          owner_id?: string | null
          timezone?: string | null
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      aecr_scores: {
        Row: {
          date_calculated: string
          id: string
          kpi_snapshot: Json
          percentile_rank: number
          score: number
          team_id: string
        }
        Insert: {
          date_calculated?: string
          id?: string
          kpi_snapshot: Json
          percentile_rank: number
          score: number
          team_id: string
        }
        Update: {
          date_calculated?: string
          id?: string
          kpi_snapshot?: Json
          percentile_rank?: number
          score?: number
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aecr_scores_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          channel: string | null
          delivery_method: string | null
          id: string
          kpi: string | null
          last_triggered_at: string | null
          platform: string | null
          team_id: string
          threshold: number | null
          trigger_type: string
        }
        Insert: {
          channel?: string | null
          delivery_method?: string | null
          id?: string
          kpi?: string | null
          last_triggered_at?: string | null
          platform?: string | null
          team_id: string
          threshold?: number | null
          trigger_type: string
        }
        Update: {
          channel?: string | null
          delivery_method?: string | null
          id?: string
          kpi?: string | null
          last_triggered_at?: string | null
          platform?: string | null
          team_id?: string
          threshold?: number | null
          trigger_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          body: string | null
          dismissible: boolean | null
          id: string
          published_at: string | null
          title: string
        }
        Insert: {
          body?: string | null
          dismissible?: boolean | null
          id?: string
          published_at?: string | null
          title: string
        }
        Update: {
          body?: string | null
          dismissible?: boolean | null
          id?: string
          published_at?: string | null
          title?: string
        }
        Relationships: []
      }
      announcements_seen: {
        Row: {
          announcement_id: string | null
          id: string
          seen_at: string | null
          user_id: string | null
        }
        Insert: {
          announcement_id?: string | null
          id?: string
          seen_at?: string | null
          user_id?: string | null
        }
        Update: {
          announcement_id?: string | null
          id?: string
          seen_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_seen_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          label: string | null
          last_used_at: string | null
          scopes: string[] | null
          team_id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          label?: string | null
          last_used_at?: string | null
          scopes?: string[] | null
          team_id: string
          token: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          label?: string | null
          last_used_at?: string | null
          scopes?: string[] | null
          team_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      background_jobs: {
        Row: {
          completed_at: string | null
          id: string
          job_type: string
          log: string | null
          related_id: string | null
          started_at: string | null
          status: string
          triggered_by: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          job_type: string
          log?: string | null
          related_id?: string | null
          started_at?: string | null
          status: string
          triggered_by?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          job_type?: string
          log?: string | null
          related_id?: string | null
          started_at?: string | null
          status?: string
          triggered_by?: string | null
        }
        Relationships: []
      }
      benchmarks: {
        Row: {
          channel: string
          conversion_type: string
          created_at: string | null
          id: string
          industry: string
          kpi: string
          median: number
          percentile_25: number
          percentile_75: number
          platform: string
          region: string
          sample_size: number
        }
        Insert: {
          channel: string
          conversion_type: string
          created_at?: string | null
          id?: string
          industry: string
          kpi: string
          median: number
          percentile_25: number
          percentile_75: number
          platform: string
          region: string
          sample_size: number
        }
        Update: {
          channel?: string
          conversion_type?: string
          created_at?: string | null
          id?: string
          industry?: string
          kpi?: string
          median?: number
          percentile_25?: number
          percentile_75?: number
          platform?: string
          region?: string
          sample_size?: number
        }
        Relationships: []
      }
      billing_events: {
        Row: {
          data: Json | null
          event_type: string | null
          id: string
          received_at: string | null
          stripe_event_id: string | null
          team_id: string | null
        }
        Insert: {
          data?: Json | null
          event_type?: string | null
          id?: string
          received_at?: string | null
          stripe_event_id?: string | null
          team_id?: string | null
        }
        Update: {
          data?: Json | null
          event_type?: string | null
          id?: string
          received_at?: string | null
          stripe_event_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_events_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_snapshots: {
        Row: {
          campaign_id: string
          conversion_value: number | null
          conversions: number | null
          cpa: number | null
          ctr: number | null
          date: string
          id: string
          roas: number | null
          spend: number | null
        }
        Insert: {
          campaign_id: string
          conversion_value?: number | null
          conversions?: number | null
          cpa?: number | null
          ctr?: number | null
          date: string
          id?: string
          roas?: number | null
          spend?: number | null
        }
        Update: {
          campaign_id?: string
          conversion_value?: number | null
          conversions?: number | null
          cpa?: number | null
          ctr?: number | null
          date?: string
          id?: string
          roas?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_snapshots_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_sync_logs: {
        Row: {
          error_details: string | null
          id: string
          oauth_account_id: string | null
          platform: string | null
          status: string | null
          sync_end: string | null
          sync_start: string | null
        }
        Insert: {
          error_details?: string | null
          id?: string
          oauth_account_id?: string | null
          platform?: string | null
          status?: string | null
          sync_end?: string | null
          sync_start?: string | null
        }
        Update: {
          error_details?: string | null
          id?: string
          oauth_account_id?: string | null
          platform?: string | null
          status?: string | null
          sync_end?: string | null
          sync_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_sync_logs_oauth_account_id_fkey"
            columns: ["oauth_account_id"]
            isOneToOne: false
            referencedRelation: "oauth_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          campaign_id: string | null
          campaign_name: string | null
          channel: string | null
          clicks: number | null
          conversion_type: string | null
          conversion_value: number | null
          conversions: number | null
          cpa: number | null
          created_at: string | null
          ctr: number | null
          custom_labels: Json | null
          end_date: string | null
          geo_targeting: Json | null
          id: string
          impressions: number | null
          is_experiment: boolean | null
          oauth_account_id: string | null
          objective: string | null
          optimization_event: string | null
          platform: string | null
          roas: number | null
          spend: number | null
          start_date: string | null
          status: string | null
          team_id: string
        }
        Insert: {
          campaign_id?: string | null
          campaign_name?: string | null
          channel?: string | null
          clicks?: number | null
          conversion_type?: string | null
          conversion_value?: number | null
          conversions?: number | null
          cpa?: number | null
          created_at?: string | null
          ctr?: number | null
          custom_labels?: Json | null
          end_date?: string | null
          geo_targeting?: Json | null
          id?: string
          impressions?: number | null
          is_experiment?: boolean | null
          oauth_account_id?: string | null
          objective?: string | null
          optimization_event?: string | null
          platform?: string | null
          roas?: number | null
          spend?: number | null
          start_date?: string | null
          status?: string | null
          team_id: string
        }
        Update: {
          campaign_id?: string | null
          campaign_name?: string | null
          channel?: string | null
          clicks?: number | null
          conversion_type?: string | null
          conversion_value?: number | null
          conversions?: number | null
          cpa?: number | null
          created_at?: string | null
          ctr?: number | null
          custom_labels?: Json | null
          end_date?: string | null
          geo_targeting?: Json | null
          id?: string
          impressions?: number | null
          is_experiment?: boolean | null
          oauth_account_id?: string | null
          objective?: string | null
          optimization_event?: string | null
          platform?: string | null
          roas?: number | null
          spend?: number | null
          start_date?: string | null
          status?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_oauth_account_id_fkey"
            columns: ["oauth_account_id"]
            isOneToOne: false
            referencedRelation: "oauth_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      company_industry: {
        Row: {
          category: string | null
          company_id: string
          created_at: string
          detail: string | null
          domain: string | null
          id: string
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          company_id: string
          created_at?: string
          detail?: string | null
          domain?: string | null
          id?: string
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          company_id?: string
          created_at?: string
          detail?: string | null
          domain?: string | null
          id?: string
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          business_model: string | null
          company_size: string | null
          created_at: string | null
          customer_type: string | null
          geo_focus: string | null
          id: string
          industry: string | null
          onboarding_step: number | null
          product_type: string | null
          revenue_range: string | null
          sales_motion: string | null
          sub_industry: string | null
          updated_at: string | null
        }
        Insert: {
          business_model?: string | null
          company_size?: string | null
          created_at?: string | null
          customer_type?: string | null
          geo_focus?: string | null
          id: string
          industry?: string | null
          onboarding_step?: number | null
          product_type?: string | null
          revenue_range?: string | null
          sales_motion?: string | null
          sub_industry?: string | null
          updated_at?: string | null
        }
        Update: {
          business_model?: string | null
          company_size?: string | null
          created_at?: string | null
          customer_type?: string | null
          geo_focus?: string | null
          id?: string
          industry?: string | null
          onboarding_step?: number | null
          product_type?: string | null
          revenue_range?: string | null
          sales_motion?: string | null
          sub_industry?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_user_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "public_user_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_types: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      deleted_objects: {
        Row: {
          deleted_at: string | null
          deleted_by: string | null
          id: string
          object_id: string
          table_name: string
        }
        Insert: {
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          object_id: string
          table_name: string
        }
        Update: {
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          object_id?: string
          table_name?: string
        }
        Relationships: []
      }
      enterprise_requests: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          id: string
          message: string | null
          status: string | null
          submitted_at: string | null
          team_id: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          id?: string
          message?: string | null
          status?: string | null
          submitted_at?: string | null
          team_id?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          id?: string
          message?: string | null
          status?: string | null
          submitted_at?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      experiments: {
        Row: {
          actual_result: string | null
          campaign_id: string | null
          expected_result: string | null
          hypothesis: string | null
          id: string
          metric: string | null
          status: string | null
          team_id: string
          vs_benchmark_comparison: string | null
        }
        Insert: {
          actual_result?: string | null
          campaign_id?: string | null
          expected_result?: string | null
          hypothesis?: string | null
          id?: string
          metric?: string | null
          status?: string | null
          team_id: string
          vs_benchmark_comparison?: string | null
        }
        Update: {
          actual_result?: string | null
          campaign_id?: string | null
          expected_result?: string | null
          hypothesis?: string | null
          id?: string
          metric?: string | null
          status?: string | null
          team_id?: string
          vs_benchmark_comparison?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          enabled_for_plans: string[] | null
          enabled_for_teams: string[] | null
          feature_key: string
          id: string
          rollout_percent: number | null
        }
        Insert: {
          enabled_for_plans?: string[] | null
          enabled_for_teams?: string[] | null
          feature_key: string
          id?: string
          rollout_percent?: number | null
        }
        Update: {
          enabled_for_plans?: string[] | null
          enabled_for_teams?: string[] | null
          feature_key?: string
          id?: string
          rollout_percent?: number | null
        }
        Relationships: []
      }
      feature_privileges: {
        Row: {
          ai_enabled: boolean | null
          alerts_enabled: boolean | null
          benchmark_overlay: boolean | null
          exports_enabled: boolean | null
          max_users: number | null
          oauth_integrations: boolean | null
          plan: string
          reports_enabled: boolean | null
          white_label_enabled: boolean | null
        }
        Insert: {
          ai_enabled?: boolean | null
          alerts_enabled?: boolean | null
          benchmark_overlay?: boolean | null
          exports_enabled?: boolean | null
          max_users?: number | null
          oauth_integrations?: boolean | null
          plan: string
          reports_enabled?: boolean | null
          white_label_enabled?: boolean | null
        }
        Update: {
          ai_enabled?: boolean | null
          alerts_enabled?: boolean | null
          benchmark_overlay?: boolean | null
          exports_enabled?: boolean | null
          max_users?: number | null
          oauth_integrations?: boolean | null
          plan?: string
          reports_enabled?: boolean | null
          white_label_enabled?: boolean | null
        }
        Relationships: []
      }
      ga_accounts: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          region_code: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id: string
          region_code?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          region_code?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          domain: string
          id: string
          microsegment: string | null
          segment: string | null
          slug: string | null
          subcategory: string | null
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          domain: string
          id?: string
          microsegment?: string | null
          segment?: string | null
          slug?: string | null
          subcategory?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          domain?: string
          id?: string
          microsegment?: string | null
          segment?: string | null
          slug?: string | null
          subcategory?: string | null
        }
        Relationships: []
      }
      industry_hierarchy: {
        Row: {
          category: string | null
          detail: string | null
          domain: string
          id: number
          subcategory: string | null
        }
        Insert: {
          category?: string | null
          detail?: string | null
          domain: string
          id?: number
          subcategory?: string | null
        }
        Update: {
          category?: string | null
          detail?: string | null
          domain?: string
          id?: number
          subcategory?: string | null
        }
        Relationships: []
      }
      kpis: {
        Row: {
          id: string
          is_primary: boolean | null
          key: string
          label: string
          unit: string | null
        }
        Insert: {
          id?: string
          is_primary?: boolean | null
          key: string
          label: string
          unit?: string | null
        }
        Update: {
          id?: string
          is_primary?: boolean | null
          key?: string
          label?: string
          unit?: string | null
        }
        Relationships: []
      }
      metrics: {
        Row: {
          aecr: Json
          alerts: Json
          campaigns: Json
          created_at: string
          id: string
          kpis: Json
          team_id: string | null
          trends: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          aecr: Json
          alerts: Json
          campaigns: Json
          created_at?: string
          id?: string
          kpis: Json
          team_id?: string | null
          trends: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          aecr?: Json
          alerts?: Json
          campaigns?: Json
          created_at?: string
          id?: string
          kpis?: Json
          team_id?: string | null
          trends?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      oauth_accounts: {
        Row: {
          access_token: string | null
          account_id: string | null
          account_name: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          last_synced_at: string | null
          platform: string
          refresh_token: string | null
          status: string | null
          sync_error: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_id?: string | null
          account_name?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          last_synced_at?: string | null
          platform: string
          refresh_token?: string | null
          status?: string | null
          sync_error?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_id?: string | null
          account_name?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          last_synced_at?: string | null
          platform?: string
          refresh_token?: string | null
          status?: string | null
          sync_error?: string | null
          team_id?: string
          user_id?: string
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
      platforms: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_model: string | null
          company_name: string | null
          company_size: string | null
          created_at: string | null
          customer_type: string | null
          geo_focus: string | null
          goals: string[] | null
          id: string
          industry: string | null
          onboarding_step: number | null
          product_type: string | null
          revenue_range: string | null
          sales_motion: string | null
          sub_industry: string | null
          timezone: string | null
        }
        Insert: {
          business_model?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          customer_type?: string | null
          geo_focus?: string | null
          goals?: string[] | null
          id: string
          industry?: string | null
          onboarding_step?: number | null
          product_type?: string | null
          revenue_range?: string | null
          sales_motion?: string | null
          sub_industry?: string | null
          timezone?: string | null
        }
        Update: {
          business_model?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          customer_type?: string | null
          geo_focus?: string | null
          goals?: string[] | null
          id?: string
          industry?: string | null
          onboarding_step?: number | null
          product_type?: string | null
          revenue_range?: string | null
          sales_motion?: string | null
          sub_industry?: string | null
          timezone?: string | null
        }
        Relationships: []
      }
      public_links: {
        Row: {
          access_level: string | null
          expires_at: string | null
          id: string
          report_id: string | null
          team_id: string | null
        }
        Insert: {
          access_level?: string | null
          expires_at?: string | null
          id?: string
          report_id?: string | null
          team_id?: string | null
        }
        Update: {
          access_level?: string | null
          expires_at?: string | null
          id?: string
          report_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_links_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_links_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendations: {
        Row: {
          campaign_id: string | null
          channel: string | null
          created_at: string | null
          id: string
          impact_score: number | null
          kpi: string | null
          platform: string | null
          recommendation_text: string | null
          status: string | null
          team_id: string
        }
        Insert: {
          campaign_id?: string | null
          channel?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          kpi?: string | null
          platform?: string | null
          recommendation_text?: string | null
          status?: string | null
          team_id: string
        }
        Update: {
          campaign_id?: string | null
          channel?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          kpi?: string | null
          platform?: string | null
          recommendation_text?: string | null
          status?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          download_url: string | null
          export_format: string | null
          filters: Json | null
          generated_at: string | null
          id: string
          is_deleted: boolean | null
          report_type: string
          team_id: string
        }
        Insert: {
          download_url?: string | null
          export_format?: string | null
          filters?: Json | null
          generated_at?: string | null
          id?: string
          is_deleted?: boolean | null
          report_type: string
          team_id: string
        }
        Update: {
          download_url?: string | null
          export_format?: string | null
          filters?: Json | null
          generated_at?: string | null
          id?: string
          is_deleted?: boolean | null
          report_type?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_views: {
        Row: {
          created_by: string
          filters: Json | null
          id: string
          is_deleted: boolean | null
          kpis: Json | null
          team_id: string
          title: string
        }
        Insert: {
          created_by: string
          filters?: Json | null
          id?: string
          is_deleted?: boolean | null
          kpis?: Json | null
          team_id: string
          title: string
        }
        Update: {
          created_by?: string
          filters?: Json | null
          id?: string
          is_deleted?: boolean | null
          kpis?: Json | null
          team_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_views_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      support_requests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          resolved_at: string | null
          status: string | null
          subject: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          status?: string | null
          subject?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          status?: string | null
          subject?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          provider: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          provider: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          provider?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      team_invitations: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          invited_by: string | null
          status: string | null
          team_id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          status?: string | null
          team_id: string
          token: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          status?: string | null
          team_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          role: string
          status: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          status?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          status?: string
          team_id?: string
          user_id?: string
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
          ai_recommendations_enabled: boolean
          avg_order_value: number | null
          avg_sales_cycle_days: number | null
          billing_cycle: string
          billing_email: string | null
          business_model: string | null
          company_type: string | null
          conversion_type: string
          created_at: string
          data_sharing_opt_in: boolean
          default_currency: string
          default_timezone: string
          favorite_kpis: Json
          geo_scope: string | null
          id: string
          industry: string
          industry_category: string | null
          is_trial: boolean
          is_whitelabel_enabled: boolean
          monthly_ad_budget: string | null
          name: string
          onboarding_completed: boolean
          pinned_tabs: Json
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          stripe_subscription_status: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          ai_recommendations_enabled?: boolean
          avg_order_value?: number | null
          avg_sales_cycle_days?: number | null
          billing_cycle?: string
          billing_email?: string | null
          business_model?: string | null
          company_type?: string | null
          conversion_type: string
          created_at?: string
          data_sharing_opt_in?: boolean
          default_currency?: string
          default_timezone?: string
          favorite_kpis?: Json
          geo_scope?: string | null
          id?: string
          industry: string
          industry_category?: string | null
          is_trial?: boolean
          is_whitelabel_enabled?: boolean
          monthly_ad_budget?: string | null
          name: string
          onboarding_completed?: boolean
          pinned_tabs?: Json
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_recommendations_enabled?: boolean
          avg_order_value?: number | null
          avg_sales_cycle_days?: number | null
          billing_cycle?: string
          billing_email?: string | null
          business_model?: string | null
          company_type?: string | null
          conversion_type?: string
          created_at?: string
          data_sharing_opt_in?: boolean
          default_currency?: string
          default_timezone?: string
          favorite_kpis?: Json
          geo_scope?: string | null
          id?: string
          industry?: string
          industry_category?: string | null
          is_trial?: boolean
          is_whitelabel_enabled?: boolean
          monthly_ad_budget?: string | null
          name?: string
          onboarding_completed?: boolean
          pinned_tabs?: Json
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      terms_acceptance: {
        Row: {
          accepted_at: string | null
          id: string
          ip_address: string | null
          user_id: string
          version: string | null
        }
        Insert: {
          accepted_at?: string | null
          id?: string
          ip_address?: string | null
          user_id: string
          version?: string | null
        }
        Update: {
          accepted_at?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string
          version?: string | null
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          created_at: string | null
          goals: string[] | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          goals?: string[] | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          goals?: string[] | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_user_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_goals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_goals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "public_user_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user_metadata: {
        Row: {
          custom_preferences: Json | null
          id: string
          last_seen_tab: string | null
          product_tour_completed: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          custom_preferences?: Json | null
          id?: string
          last_seen_tab?: string | null
          product_tour_completed?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          custom_preferences?: Json | null
          id?: string
          last_seen_tab?: string | null
          product_tour_completed?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string | null
          email_alerts_enabled: boolean | null
          id: string
          report_digest_enabled: boolean | null
          slack_alerts_enabled: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_alerts_enabled?: boolean | null
          id?: string
          report_digest_enabled?: boolean | null
          slack_alerts_enabled?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_alerts_enabled?: boolean | null
          id?: string
          report_digest_enabled?: boolean | null
          slack_alerts_enabled?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          needs_help: boolean | null
          reporting_frequency: string | null
          updated_at: string | null
          wants_beta: boolean | null
          works_with_agency: boolean | null
        }
        Insert: {
          created_at?: string | null
          id: string
          needs_help?: boolean | null
          reporting_frequency?: string | null
          updated_at?: string | null
          wants_beta?: boolean | null
          works_with_agency?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          needs_help?: boolean | null
          reporting_frequency?: string | null
          updated_at?: string | null
          wants_beta?: boolean | null
          works_with_agency?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_user_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "public_user_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user_recommendations: {
        Row: {
          ai_cluster: string | null
          created_at: string | null
          custom_tip: string | null
          id: string
          recommended_tools: string[] | null
          top_priority: string | null
          updated_at: string | null
        }
        Insert: {
          ai_cluster?: string | null
          created_at?: string | null
          custom_tip?: string | null
          id: string
          recommended_tools?: string[] | null
          top_priority?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_cluster?: string | null
          created_at?: string | null
          custom_tip?: string | null
          id?: string
          recommended_tools?: string[] | null
          top_priority?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_recommendations_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_user_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_recommendations_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_recommendations_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "public_user_profile_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          device: string | null
          id: string
          ip_address: string | null
          location: string | null
          login_time: string | null
          user_id: string
        }
        Insert: {
          device?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          login_time?: string | null
          user_id: string
        }
        Update: {
          device?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          login_time?: string | null
          user_id?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          error_log: string | null
          event_type: string | null
          id: string
          is_active: boolean | null
          last_called_at: string | null
          team_id: string
          url: string
        }
        Insert: {
          created_at?: string | null
          error_log?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          last_called_at?: string | null
          team_id: string
          url: string
        }
        Update: {
          created_at?: string | null
          error_log?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          last_called_at?: string | null
          team_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_user_overview: {
        Row: {
          company_size: string | null
          geo_focus: string | null
          goals: string[] | null
          id: string | null
          industry: string | null
          reporting_frequency: string | null
          revenue_range: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      public_user_profile_view: {
        Row: {
          ai_cluster: string | null
          business_model: string | null
          company_size: string | null
          company_updated_at: string | null
          connected_integrations: string[] | null
          custom_tip: string | null
          customer_type: string | null
          geo_focus: string | null
          goals: string[] | null
          goals_updated_at: string | null
          id: string | null
          industry: string | null
          joined_at: string | null
          last_connected_at: string | null
          needs_help: boolean | null
          onboarding_step: number | null
          preferences_updated_at: string | null
          product_type: string | null
          recommendations_updated_at: string | null
          recommended_tools: string[] | null
          reporting_frequency: string | null
          revenue_range: string | null
          sales_motion: string | null
          sub_industry: string | null
          top_priority: string | null
          wants_beta: boolean | null
          works_with_agency: boolean | null
        }
        Relationships: []
      }
      user_integrations_summary: {
        Row: {
          connected_integrations: string[] | null
          id: string | null
          last_connected_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

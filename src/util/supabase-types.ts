export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  _supavisor: {
    Tables: {
      cluster_tenants: {
        Row: {
          active: boolean;
          cluster_alias: string | null;
          id: string;
          inserted_at: string;
          tenant_external_id: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          cluster_alias?: string | null;
          id: string;
          inserted_at: string;
          tenant_external_id?: string | null;
          type: string;
          updated_at: string;
        };
        Update: {
          active?: boolean;
          cluster_alias?: string | null;
          id?: string;
          inserted_at?: string;
          tenant_external_id?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cluster_tenants_cluster_alias_fkey";
            columns: ["cluster_alias"];
            referencedRelation: "clusters";
            referencedColumns: ["alias"];
          },
          {
            foreignKeyName: "cluster_tenants_tenant_external_id_fkey";
            columns: ["tenant_external_id"];
            referencedRelation: "tenants";
            referencedColumns: ["external_id"];
          },
        ];
      };
      clusters: {
        Row: {
          active: boolean;
          alias: string;
          id: string;
          inserted_at: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          alias: string;
          id: string;
          inserted_at: string;
          updated_at: string;
        };
        Update: {
          active?: boolean;
          alias?: string;
          id?: string;
          inserted_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      schema_migrations: {
        Row: {
          inserted_at: string | null;
          version: number;
        };
        Insert: {
          inserted_at?: string | null;
          version: number;
        };
        Update: {
          inserted_at?: string | null;
          version?: number;
        };
        Relationships: [];
      };
      tenants: {
        Row: {
          allow_list: string[];
          auth_query: string | null;
          client_heartbeat_interval: number;
          client_idle_timeout: number;
          db_database: string;
          db_host: string;
          db_port: number;
          default_max_clients: number;
          default_parameter_status: Json;
          default_pool_size: number;
          default_pool_strategy: string;
          enforce_ssl: boolean;
          external_id: string;
          id: string;
          inserted_at: string;
          ip_version: string;
          require_user: boolean;
          sni_hostname: string | null;
          updated_at: string;
          upstream_ssl: boolean;
          upstream_tls_ca: string | null;
          upstream_verify: string | null;
        };
        Insert: {
          allow_list?: string[];
          auth_query?: string | null;
          client_heartbeat_interval?: number;
          client_idle_timeout?: number;
          db_database: string;
          db_host: string;
          db_port: number;
          default_max_clients?: number;
          default_parameter_status: Json;
          default_pool_size?: number;
          default_pool_strategy?: string;
          enforce_ssl?: boolean;
          external_id: string;
          id: string;
          inserted_at: string;
          ip_version?: string;
          require_user?: boolean;
          sni_hostname?: string | null;
          updated_at: string;
          upstream_ssl?: boolean;
          upstream_tls_ca?: string | null;
          upstream_verify?: string | null;
        };
        Update: {
          allow_list?: string[];
          auth_query?: string | null;
          client_heartbeat_interval?: number;
          client_idle_timeout?: number;
          db_database?: string;
          db_host?: string;
          db_port?: number;
          default_max_clients?: number;
          default_parameter_status?: Json;
          default_pool_size?: number;
          default_pool_strategy?: string;
          enforce_ssl?: boolean;
          external_id?: string;
          id?: string;
          inserted_at?: string;
          ip_version?: string;
          require_user?: boolean;
          sni_hostname?: string | null;
          updated_at?: string;
          upstream_ssl?: boolean;
          upstream_tls_ca?: string | null;
          upstream_verify?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          db_pass_encrypted: string;
          db_user: string;
          db_user_alias: string;
          id: string;
          inserted_at: string;
          is_manager: boolean;
          max_clients: number | null;
          mode_type: string;
          pool_checkout_timeout: number;
          pool_size: number;
          tenant_external_id: string | null;
          updated_at: string;
        };
        Insert: {
          db_pass_encrypted: string;
          db_user: string;
          db_user_alias: string;
          id: string;
          inserted_at: string;
          is_manager?: boolean;
          max_clients?: number | null;
          mode_type: string;
          pool_checkout_timeout?: number;
          pool_size: number;
          tenant_external_id?: string | null;
          updated_at: string;
        };
        Update: {
          db_pass_encrypted?: string;
          db_user?: string;
          db_user_alias?: string;
          id?: string;
          inserted_at?: string;
          is_manager?: boolean;
          max_clients?: number | null;
          mode_type?: string;
          pool_checkout_timeout?: number;
          pool_size?: number;
          tenant_external_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_tenant_external_id_fkey";
            columns: ["tenant_external_id"];
            referencedRelation: "tenants";
            referencedColumns: ["external_id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  pgbouncer: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_auth: {
        Args: {
          p_usename: string;
        };
        Returns: {
          username: string;
          password: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          access_token: string;
          created_at: string;
          expires_at: number | null;
          expires_in: number | null;
          id: string;
          id_token: string | null;
          obtainment_timestamp: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string;
          requires_refresh: boolean | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          updated_at: string;
          userId: string;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          expires_at?: number | null;
          expires_in?: number | null;
          id?: string;
          id_token?: string | null;
          obtainment_timestamp?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string;
          requires_refresh?: boolean | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          updated_at?: string;
          userId: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          expires_at?: number | null;
          expires_in?: number | null;
          id?: string;
          id_token?: string | null;
          obtainment_timestamp?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string;
          requires_refresh?: boolean | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          updated_at?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bets: {
        Row: {
          created_at: string;
          dire_score: number | null;
          hero_name: string | null;
          hero_slot: number | null;
          id: string;
          is_doubledown: boolean;
          is_party: boolean;
          kda: Json | null;
          lobby_type: number | null;
          matchId: string;
          myTeam: string;
          predictionId: string | null;
          radiant_score: number | null;
          steam32Id: number | null;
          updated_at: string;
          userId: string;
          won: boolean | null;
        };
        Insert: {
          created_at?: string;
          dire_score?: number | null;
          hero_name?: string | null;
          hero_slot?: number | null;
          id?: string;
          is_doubledown?: boolean;
          is_party?: boolean;
          kda?: Json | null;
          lobby_type?: number | null;
          matchId: string;
          myTeam: string;
          predictionId?: string | null;
          radiant_score?: number | null;
          steam32Id?: number | null;
          updated_at?: string;
          userId: string;
          won?: boolean | null;
        };
        Update: {
          created_at?: string;
          dire_score?: number | null;
          hero_name?: string | null;
          hero_slot?: number | null;
          id?: string;
          is_doubledown?: boolean;
          is_party?: boolean;
          kda?: Json | null;
          lobby_type?: number | null;
          matchId?: string;
          myTeam?: string;
          predictionId?: string | null;
          radiant_score?: number | null;
          steam32Id?: number | null;
          updated_at?: string;
          userId?: string;
          won?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "bets_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      discord_accounts: {
        Row: {
          access_token: string;
          created_at: string;
          expires_in: number;
          id: number;
          providerAccountId: number;
          refresh_token: string;
          scope: string;
          token_type: string;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          expires_in: number;
          id?: number;
          providerAccountId: number;
          refresh_token: string;
          scope: string;
          token_type: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          expires_in?: number;
          id?: number;
          providerAccountId?: number;
          refresh_token?: string;
          scope?: string;
          token_type?: string;
        };
        Relationships: [];
      };
      mods: {
        Row: {
          created_at: string;
          id: number;
          mod_user_id: string | null;
          streamer_user_id: string;
          temp_mod_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          mod_user_id?: string | null;
          streamer_user_id: string;
          temp_mod_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          mod_user_id?: string | null;
          streamer_user_id?: string;
          temp_mod_name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mods_mod_user_id_fkey";
            columns: ["mod_user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mods_streamer_user_id_fkey";
            columns: ["streamer_user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      settings: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          updated_at: string;
          userId: string;
          value: Json | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          updated_at?: string;
          userId: string;
          value?: Json | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          updated_at?: string;
          userId?: string;
          value?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "settings_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      steam_accounts: {
        Row: {
          connectedUserIds: string[] | null;
          created_at: string;
          id: string;
          leaderboard_rank: number | null;
          mmr: number;
          name: string | null;
          steam32Id: number;
          updated_at: string;
          userId: string;
        };
        Insert: {
          connectedUserIds?: string[] | null;
          created_at?: string;
          id?: string;
          leaderboard_rank?: number | null;
          mmr?: number;
          name?: string | null;
          steam32Id: number;
          updated_at?: string;
          userId: string;
        };
        Update: {
          connectedUserIds?: string[] | null;
          created_at?: string;
          id?: string;
          leaderboard_rank?: number | null;
          mmr?: number;
          name?: string | null;
          steam32Id?: number;
          updated_at?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "steam_accounts_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      streams: {
        Row: {
          category_id: number | null;
          category_name: string | null;
          created_at: string;
          followers: number | null;
          id: string;
          stream_delay: number | null;
          stream_online: boolean;
          stream_start_date: string | null;
          title: string | null;
          updated_at: string;
          userId: string;
        };
        Insert: {
          category_id?: number | null;
          category_name?: string | null;
          created_at?: string;
          followers?: number | null;
          id: string;
          stream_delay?: number | null;
          stream_online?: boolean;
          stream_start_date?: string | null;
          title?: string | null;
          updated_at?: string;
          userId: string;
        };
        Update: {
          category_id?: number | null;
          category_name?: string | null;
          created_at?: string;
          followers?: number | null;
          id?: string;
          stream_delay?: number | null;
          stream_online?: boolean;
          stream_start_date?: string | null;
          title?: string | null;
          updated_at?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "streams_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          beta_tester: boolean;
          created_at: string;
          displayName: string | null;
          email: string | null;
          emailVerified: string | null;
          followers: number | null;
          id: string;
          image: string | null;
          kick: number | null;
          locale: string;
          mmr: number;
          name: string;
          steam32Id: number | null;
          stream_delay: number | null;
          stream_online: boolean;
          stream_start_date: string | null;
          updated_at: string;
          youtube: string | null;
        };
        Insert: {
          beta_tester?: boolean;
          created_at?: string;
          displayName?: string | null;
          email?: string | null;
          emailVerified?: string | null;
          followers?: number | null;
          id?: string;
          image?: string | null;
          kick?: number | null;
          locale?: string;
          mmr?: number;
          name?: string;
          steam32Id?: number | null;
          stream_delay?: number | null;
          stream_online?: boolean;
          stream_start_date?: string | null;
          updated_at?: string;
          youtube?: string | null;
        };
        Update: {
          beta_tester?: boolean;
          created_at?: string;
          displayName?: string | null;
          email?: string | null;
          emailVerified?: string | null;
          followers?: number | null;
          id?: string;
          image?: string | null;
          kick?: number | null;
          locale?: string;
          mmr?: number;
          name?: string;
          steam32Id?: number | null;
          stream_delay?: number | null;
          stream_online?: boolean;
          stream_start_date?: string | null;
          updated_at?: string;
          youtube?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_grouped_bets: {
        Args: {
          channel_id: string;
          start_date: string;
        };
        Returns: {
          won: boolean;
          lobby_type: number;
          is_party: boolean;
          is_doubledown: boolean;
          _count_won: number;
          _count_is_party: number;
          _count_is_doubledown: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
            columns: ["upload_id"];
            referencedRelation: "s3_multipart_uploads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

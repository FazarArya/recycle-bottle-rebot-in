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
      botol_types: {
        Row: {
          coin: number
          created_at: string
          id: string
          kategori: string
          kode_barcode: string
          nama: string
        }
        Insert: {
          coin: number
          created_at?: string
          id?: string
          kategori: string
          kode_barcode: string
          nama: string
        }
        Update: {
          coin?: number
          created_at?: string
          id?: string
          kategori?: string
          kode_barcode?: string
          nama?: string
        }
        Relationships: []
      }
      machine_status_logs: {
        Row: {
          created_at: string
          id: string
          machine_id: string
          pesan: string | null
          status: string
          waktu: string
        }
        Insert: {
          created_at?: string
          id?: string
          machine_id: string
          pesan?: string | null
          status: string
          waktu?: string
        }
        Update: {
          created_at?: string
          id?: string
          machine_id?: string
          pesan?: string | null
          status?: string
          waktu?: string
        }
        Relationships: [
          {
            foreignKeyName: "machine_status_logs_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
        ]
      }
      machines: {
        Row: {
          created_at: string
          id: string
          kode_mitra: string
          koneksi: string
          last_update: string
          lokasi: string
          mitra_id: string | null
          slot_status: Json
          status_kapasitas: string
        }
        Insert: {
          created_at?: string
          id?: string
          kode_mitra: string
          koneksi?: string
          last_update?: string
          lokasi: string
          mitra_id?: string | null
          slot_status?: Json
          status_kapasitas?: string
        }
        Update: {
          created_at?: string
          id?: string
          kode_mitra?: string
          koneksi?: string
          last_update?: string
          lokasi?: string
          mitra_id?: string | null
          slot_status?: Json
          status_kapasitas?: string
        }
        Relationships: [
          {
            foreignKeyName: "machines_mitra_id_fkey"
            columns: ["mitra_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          alamat: string | null
          created_at: string
          email: string
          id: string
          nama: string
          no_hp: string | null
          updated_at: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          email: string
          id: string
          nama: string
          no_hp?: string | null
          updated_at?: string
        }
        Update: {
          alamat?: string | null
          created_at?: string
          email?: string
          id?: string
          nama?: string
          no_hp?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions_botol: {
        Row: {
          created_at: string
          data_botol: Json
          id: string
          machine_id: string | null
          tanggal: string
          total_coin: number
          user_id: string
        }
        Insert: {
          created_at?: string
          data_botol: Json
          id?: string
          machine_id?: string | null
          tanggal?: string
          total_coin: number
          user_id: string
        }
        Update: {
          created_at?: string
          data_botol?: Json
          id?: string
          machine_id?: string | null
          tanggal?: string
          total_coin?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_botol_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_botol_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_coin: {
        Row: {
          barcode_code: string | null
          biaya_layanan: number
          created_at: string
          expires_at: string | null
          id: string
          jumlah_coin: number
          redeemed_at: string | null
          status: string
          timestamp: string
          total_diterima: number
          user_id: string
        }
        Insert: {
          barcode_code?: string | null
          biaya_layanan?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          jumlah_coin: number
          redeemed_at?: string | null
          status?: string
          timestamp?: string
          total_diterima: number
          user_id: string
        }
        Update: {
          barcode_code?: string | null
          biaya_layanan?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          jumlah_coin?: number
          redeemed_at?: string | null
          status?: string
          timestamp?: string
          total_diterima?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_coin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          id: string
          komisi_mitra: number
          saldo_coin: number
          total_botol: number
        }
        Insert: {
          id: string
          komisi_mitra?: number
          saldo_coin?: number
          total_botol?: number
        }
        Update: {
          id?: string
          komisi_mitra?: number
          saldo_coin?: number
          total_botol?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_codes: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          kode_otp: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          kode_otp: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          kode_otp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "teman" | "mitra" | "admin"
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
    Enums: {
      app_role: ["teman", "mitra", "admin"],
    },
  },
} as const

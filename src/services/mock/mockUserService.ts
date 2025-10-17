import {
  UserProfile,
  NotificationSettings,
  SecuritySettings,
  OrganizationMember,
  InviteUserRequest,
} from "../userService";

class MockUserService {
  private delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async getCurrentUser(): Promise<any> {
    await this.delay(400);

    const token = localStorage.getItem("auth_token") || "";
    const isOrgUser = token.includes("org");

    return {
      id: "demo-user-001",
      email: isOrgUser ? "admin@arisetech.com" : "demo@individual.com",
      phone: "+234-801-234-5678",
      firstName: "onu omar-ikaige",
      lastName: "",
      role: isOrgUser ? "organization-admin" : "individual",
      organizationId: isOrgUser ? "org-arise-001" : undefined,
      organizationName: isOrgUser ? "AriseTech Solutions" : undefined,
      isVerified: true,
      createdAt: "2024-01-15T10:30:00Z",
    };
  }

  async getUserHello(): Promise<{ message: string; firstName: string }> {
    await this.delay(300);

    const token = localStorage.getItem("auth_token") || "";
    const isOrgUser = token.includes("org");
    const firstName = "Onu";

    return {
      message: `Welcome back, ${firstName}!`,
      firstName: firstName,
    };
  }

  async getProfile(): Promise<UserProfile> {
    await this.delay(500);

    const token = localStorage.getItem("auth_token") || "";
    const isOrgUser = token.includes("org");

    return {
      id: "demo-user-001",
      email: isOrgUser ? "admin@arisetech.com" : "demo@individual.com",
      phone: "+234-801-234-5678",
      firstName: "onu omar-ikaige",
      lastName: "",
      role: isOrgUser ? "organization-admin" : "individual",
      organizationId: isOrgUser ? "org-arise-001" : undefined,
      organizationName: isOrgUser ? "AriseTech Solutions" : undefined,
      isVerified: true,
      createdAt: "2024-01-15T10:30:00Z",
      avatar: undefined,
      timezone: "Africa/Lagos",
      language: "en",
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      twoFactorEnabled: false,
    };
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    await this.delay(600);

    const currentProfile = await this.getProfile();
    return { ...currentProfile, ...data };
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    await this.delay(1000);

    return {
      avatarUrl: URL.createObjectURL(file),
    };
  }

  async getNotificationSettings(): Promise<NotificationSettings> {
    await this.delay(400);

    return {
      email: true,
      sms: false,
      push: true,
      verificationUpdates: true,
      walletUpdates: true,
      securityAlerts: true,
      marketingEmails: false,
    };
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    await this.delay(500);

    const current = await this.getNotificationSettings();
    return { ...current, ...settings };
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    await this.delay(400);

    return {
      twoFactorEnabled: false,
      loginNotifications: true,
      deviceTrust: true,
      sessionTimeout: 30,
    };
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    await this.delay(500);

    const current = await this.getSecuritySettings();
    return { ...current, ...settings };
  }

  async enableTwoFactor(): Promise<{ qrCode: string; backupCodes: string[] }> {
    await this.delay(800);

    return {
      qrCode: "data:image/png;base64,mock-qr-code",
      backupCodes: ["ABC123", "DEF456", "GHI789"],
    };
  }

  async verifyTwoFactor(code: string): Promise<{ message: string }> {
    await this.delay(600);

    if (code === "123456") {
      return { message: "Two-factor authentication enabled successfully" };
    }
    throw new Error("Invalid verification code");
  }

  async disableTwoFactor(token: string): Promise<{ message: string }> {
    await this.delay(600);

    return {
      message: "Two-factor authentication disabled",
    };
  }

  async getOrganizationMembers(): Promise<OrganizationMember[]> {
    await this.delay(600);

    return [
      {
        id: "member-001",
        user: {
          id: "user-001",
          email: "admin@arisetech.com",
          firstName: "onu omar-ikaige",
          lastName: "",
          role: "organization-admin",
          organizationId: "org-arise-001",
          organizationName: "AriseTech Solutions",
          isVerified: true,
          createdAt: "2024-01-10T08:00:00Z",
        },
        role: "admin",
        status: "active",
        joinedAt: "2024-01-10T08:00:00Z",
        lastActive: new Date().toISOString(),
        permissions: ["all"],
      },
      {
        id: "member-002",
        user: {
          id: "user-002",
          email: "member@arisetech.com",
          firstName: "onu omar-ikaige",
          lastName: "",
          role: "organization-member",
          organizationId: "org-arise-001",
          organizationName: "AriseTech Solutions",
          isVerified: true,
          createdAt: "2024-01-12T09:15:00Z",
        },
        role: "member",
        status: "active",
        joinedAt: "2024-01-12T09:15:00Z",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        permissions: ["verify", "view_reports"],
      },
      {
        id: "member-003",
        user: {
          id: "user-003",
          email: "viewer@arisetech.com",
          firstName: "onu omar-ikaige",
          lastName: "",
          role: "organization-member",
          organizationId: "org-arise-001",
          organizationName: "AriseTech Solutions",
          isVerified: true,
          createdAt: "2024-03-01T14:20:00Z",
        },
        role: "member",
        status: "pending",
        joinedAt: "2024-03-01T14:20:00Z",
        permissions: ["view_reports"],
      },
    ];
  }

  async inviteUser(data: InviteUserRequest): Promise<{ message: string }> {
    await this.delay(800);

    return {
      message: "Invitation sent successfully",
    };
  }

  async removeMember(memberId: string): Promise<{ message: string }> {
    await this.delay(600);

    return {
      message: "Member removed successfully",
    };
  }

  async updateMemberRole(
    memberId: string,
    role: "admin" | "member",
    permissions?: string[],
  ): Promise<OrganizationMember> {
    await this.delay(600);

    const members = await this.getOrganizationMembers();
    const member = members.find((m) => m.id === memberId);

    if (!member) {
      throw new Error("Member not found");
    }

    return {
      ...member,
      role,
      permissions: permissions || member.permissions,
    };
  }

  async getActiveSessions(): Promise<any[]> {
    await this.delay(500);

    return [
      {
        id: "session-001",
        device: "Chrome on Windows",
        location: "Lagos, Nigeria",
        ip: "102.89.xxx.xxx",
        lastActive: new Date().toISOString(),
        current: true,
      },
      {
        id: "session-002",
        device: "Safari on iPhone",
        location: "Abuja, Nigeria",
        ip: "102.90.xxx.xxx",
        lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        current: false,
      },
    ];
  }

  async terminateSession(sessionId: string): Promise<{ message: string }> {
    await this.delay(500);

    return {
      message: "Session terminated successfully",
    };
  }

  async deleteAccount(password: string): Promise<{ message: string }> {
    await this.delay(800);

    return {
      message: "Account deletion initiated. You will receive a confirmation email.",
    };
  }
}

export const mockUserService = new MockUserService();

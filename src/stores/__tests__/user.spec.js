import { performLogin, performRegister } from "@/services/auth";
import { useUserStore } from "@/stores/user";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/auth", () => ({
  performLogin: vi.fn(),
  performRegister: vi.fn()
}));

vi.mock("jwt-decode", () => ({
  jwtDecode: () => {
    sub: "123";
  }
}));

describe("useUserStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("initial state", () => {
    const userStore = useUserStore();

    expect(userStore.isLoggedIn).toBe(false);
  });

  it("register sets accessToken", async () => {
    const userStore = useUserStore();
    const mockToken = "mock_access_token";

    performRegister.mockResolvedValueOnce({ access_token: mockToken });
    userStore.register({ username: "test", password: "test123" });
    await flushPromises();

    expect(performRegister).toHaveBeenCalledWith({ username: "test", password: "test123" });
    expect(userStore.isLoggedIn).toBe(true);
  });

  it("login sets accessToken", async () => {
    const userStore = useUserStore();
    const mockToken = "mock_access_token";

    performLogin.mockResolvedValueOnce({ access_token: mockToken });
    userStore.login({ username: "test", password: "test123" });
    await flushPromises();

    expect(performLogin).toHaveBeenCalledWith({ username: "test", password: "test123" });
    expect(userStore.isLoggedIn).toBe(true);
  });

  it("logout resets accessToken", async () => {
    const userStore = useUserStore();
    const mockToken = "mock_access_token";

    performLogin.mockResolvedValueOnce({ access_token: mockToken });
    userStore.login({ username: "test", password: "test123" });
    await flushPromises();

    expect(performLogin).toHaveBeenCalledWith({ username: "test", password: "test123" });

    userStore.logout();

    expect(userStore.isLoggedIn).toBe(false);
  });
});

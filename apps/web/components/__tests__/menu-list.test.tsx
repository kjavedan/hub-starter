import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import { MenuList } from "../menu-list";

// Mock the tsr client
vi.mock("@/lib/tsr", () => ({
  tsr: {
    v1: {
      menu: {
        getMenuItems: {
          useQuery: vi.fn(),
        },
      },
    },
  },
}));

// Import the mocked module so we can control return values per test
import { tsr } from "@/lib/tsr";

describe("MenuList", () => {
  it("should render loading state", () => {
    vi.mocked(tsr.v1.menu.getMenuItems.useQuery).mockReturnValue({
      data: undefined,
      error: null,
      isPending: true,
    } as ReturnType<typeof tsr.v1.menu.getMenuItems.useQuery>);

    render(<MenuList />);

    expect(screen.getByText("Loading menu...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    vi.mocked(tsr.v1.menu.getMenuItems.useQuery).mockReturnValue({
      data: undefined,
      error: new Error("Network error"),
      isPending: false,
    } as ReturnType<typeof tsr.v1.menu.getMenuItems.useQuery>);

    render(<MenuList />);

    expect(screen.getByText("Unable to load menu.")).toBeInTheDocument();
  });

  it("should render empty state when no items", () => {
    vi.mocked(tsr.v1.menu.getMenuItems.useQuery).mockReturnValue({
      data: { status: 200, body: [], headers: new Headers() },
      error: null,
      isPending: false,
    } as ReturnType<typeof tsr.v1.menu.getMenuItems.useQuery>);

    render(<MenuList />);

    expect(screen.getByText("No menu items yet.")).toBeInTheDocument();
  });

  it("should render menu items when data is available", () => {
    vi.mocked(tsr.v1.menu.getMenuItems.useQuery).mockReturnValue({
      data: {
        status: 200,
        body: [
          {
            id: "00000000-0000-0000-0000-000000000001",
            name: "Grilled Chicken Rice",
            description: "Tender grilled chicken served with basmati rice",
            price: 12.99,
            isAvailable: true,
            categoryId: null,
          },
        ],
        headers: new Headers(),
      },
      error: null,
      isPending: false,
    } as ReturnType<typeof tsr.v1.menu.getMenuItems.useQuery>);

    render(<MenuList />);

    expect(screen.getByText("Grilled Chicken Rice")).toBeInTheDocument();
    expect(screen.getByText("$12.99")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });
});

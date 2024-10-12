import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TrainDetails from "../pages/TrainDetails"; // Adjust the path if necessary
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mocking useNavigate and useLocation from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      state: {
        fullSchedule: {
          schedule: { _id: "schedule123", trainRef: { name: "Express Train" } },
          fromStop: { _id: "from123", departureTime: "08:00", price: 100 },
          toStop: { _id: "to123", arrivalTime: "12:00", price: 200 },
        },
        date: "2023-09-15",
      },
    }),
  };
});

// Mocking the utility function getTimeDiffInMins
vi.mock("../utils/timeDuration", () => ({
  default: () => "4h",
}));

describe("TrainDetails Component", () => {
  let mockAxios;

  beforeEach(() => {
    // Setup axios mock adapter
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders train details and handles class selection", async () => {
    // Mock the API response
    mockAxios
      .onGet(
        "https://trainease-backend.onrender.com/api/search/train-details",
        {
          params: {
            scheduleId: "schedule123",
            fromStopId: "from123",
            toStopId: "to123",
          },
        }
      )
      .reply(200, {
        fromStation: "New York",
        toStation: "Washington",
        coachTypes: [
          {
            _id: "class1",
            name: "First Class",
            priceFactor: 1.5,
            facilities: ["AC", "Wifi"],
            available: true,
          },
          {
            _id: "class2",
            name: "Second Class",
            priceFactor: 1,
            facilities: ["Food", "Wifi"],
            available: false,
          },
        ],
      });

    render(
      <BrowserRouter>
        <TrainDetails />
      </BrowserRouter>
    );
  });

  test("displays loading state while fetching train details", () => {
    mockAxios
      .onGet("https://trainease-backend.onrender.com/api/search/train-details")
      .reply(200, {}); // Simulate slow API response

    render(
      <BrowserRouter>
        <TrainDetails />
      </BrowserRouter>
    );
  });

  test("handles API error gracefully", async () => {
    // Mock an API error
    mockAxios
      .onGet("https://trainease-backend.onrender.com/api/search/train-details")
      .reply(500);

    render(
      <BrowserRouter>
        <TrainDetails />
      </BrowserRouter>
    );
  });
});

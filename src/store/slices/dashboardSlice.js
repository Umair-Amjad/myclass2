import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

// Mock API call (replace with actual backend API later)
export const fetchDashboardMetrics = createAsyncThunk(
  "dashboard/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        // Existing metrics for AdminDashboard
        totalUsers: 3842,
        organizations: 12,
        institutes: 28,
        admins: 42,
        students: 3000, // Estimated for user distribution
        teachers: 500, // Estimated for user distribution
        others: 300, // Estimated for user distribution
        userGrowthMonthly: [
          { month: "Jan", users: 30 },
          { month: "Feb", users: 40 },
          { month: "Mar", users: 50 },
          { month: "Apr", users: 70 },
          { month: "May", users: 90 },
          { month: "Jun", users: 100 },
        ],
        userGrowthYearly: [
          { year: "2021", users: 200 },
          { year: "2022", users: 500 },
          { year: "2023", users: 900 },
          { year: "2024", users: 1500 },
          { year: "2025", users: 3842 },
        ],
        recentAttendance: [
          {
            id: "ST001",
            name: "Alice Brown",
            class: "Grade 10A",
            date: "2025-04-24",
            status: "Present",
          },
          {
            id: "ST002",
            name: "Bob Wilson",
            class: "Grade 9B",
            date: "2025-04-24",
            status: "Absent",
          },
          {
            id: "ST003",
            name: "Clara Davis",
            class: "Grade 11C",
            date: "2025-04-24",
            status: "Present",
          },
        ],
        // New metrics for InstituteDashboard
        instituteStudents: 350,
        instituteTeachers: 25,
        instituteClasses: 15,
        attendanceRate: {
          present: 92,
          absent: 8,
        },
        instituteGrowthMonthly: [
          { month: "Jan", count: 10 },
          { month: "Feb", count: 15 },
          { month: "Mar", count: 20 },
          { month: "Apr", count: 25 },
          { month: "May", count: 30 },
          { month: "Jun", count: 35 },
        ],
        instituteGrowthYearly: [
          { year: "2021", count: 50 },
          { year: "2022", count: 60 },
          { year: "2023", count: 70 },
          { year: "2024", count: 80 },
          { year: "2025", count: 90 },
        ],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    metrics: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Selectors
export const selectDashboardState = (state) => state.dashboard;
export const selectMetrics = (state) => state.dashboard.metrics;
export const selectLoading = (state) => state.dashboard.loading;
export const selectError = (state) => state.dashboard.error;

// Memoized selectors
export const selectUserGrowth = createSelector(
  [selectMetrics, (_, period) => period],
  (metrics, period) => {
    if (!metrics) return { labels: [], datasets: [] };
    
    const data = period === 'Monthly' 
      ? metrics.userGrowthMonthly || []
      : metrics.userGrowthYearly || [];
      
    return {
      labels: period === 'Monthly' 
        ? data.map(item => item.month)
        : data.map(item => item.year),
      values: data.map(item => period === 'Monthly' ? item.users : item.users)
    };
  }
);

export const selectInstituteGrowth = createSelector(
  [selectMetrics, (_, period) => period],
  (metrics, period) => {
    if (!metrics) return { labels: [], datasets: [] };
    
    const data = period === 'Monthly' 
      ? metrics.instituteGrowthMonthly || []
      : metrics.instituteGrowthYearly || [];
      
    return {
      labels: period === 'Monthly' 
        ? data.map(item => item.month)
        : data.map(item => item.year),
      values: data.map(item => item.count)
    };
  }
);

export const { clearErrors } = dashboardSlice.actions;
export default dashboardSlice.reducer;

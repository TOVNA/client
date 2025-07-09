import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../../components/Card/Card";
import { StudentSnapshot } from "../../types/entities/student";
import { Grade } from "../../types/entities/grade";

interface DashboardData {
  studentStatus?: StudentSnapshot[];
  studentGrades?: Grade[];
  isLoading?: boolean;
}

const Dashboard = ({
  studentStatus = [],
  studentGrades = [],
  isLoading,
}: DashboardData) => {
  if (isLoading || studentStatus.length === 0 || studentGrades.length === 0) {
    return null;
  }

  // Get the most updated object in the array using updatedAt
  const mostUpdatedStudent = studentStatus[studentStatus.length - 1];
  const barData = mostUpdatedStudent.grades;

  const mostUpdatedStudentGrade = studentGrades[studentGrades.length - 1];

  // Prepare data for the pie chart
  const pieData = [
    { name: "Completed", value: mostUpdatedStudentGrade.score },
    { name: "Remaining", value: 100 - mostUpdatedStudentGrade.score },
  ];
  const COLORS = ["#0088FE", "#e4e4e4"];

  // Build date in format dd:mm:yyyy to be the x axis
  const lineData = studentGrades.map((grade) => ({
    time: new Date(grade.date).toLocaleDateString("he-IL"),
    ציון: grade.score,
  }));

  return (
    <>
      <Card style={{ display: "flex", cursor: "default" }}>
        {/* Pie Chart */}
        <div style={{ width: "300px" }}>
          <h3>ציון אחרון</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="30"
                fontWeight="bold"
              >
                {pieData[0].value}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Charts */}
        {barData.map((data, index) => (
          <div key={index} style={{ width: "100px", flex: 1 }}>
            <h3 style={{ textAlign: "center" }}>{data.category}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[data]}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="category" fontSize={0} tickSize={0} />
                <YAxis ticks={[0, 2, 4, 6, 8, 10]} tickMargin={40} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </Card>

      {/* Line Chart */}
      <Card style={{ cursor: "default" }}>
        <h3>ציונים לאורך זמן</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={lineData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis ticks={[0, 25, 50, 75, 100]} tickMargin={40} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ציון" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default Dashboard;

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
  AlertCircle,
  Calendar,
  DollarSign,
  Droplet,
  Leaf,
  List,
  ShoppingBag,
} from "lucide-react";
import GradientText from "./GradientText";
import { useState } from "react";
import productsData from "@/assets/Products.json";
import { useLocation } from "react-router-dom";

const SkincareAnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  const { responseData } = location.state || {}; // Access the response data

  // Analysis data (mock data)
  const analysisData = {
    condition: "Dry Skin with Mild Sensitivity",
    dietaryRecommendations: [
      "Increase omega-3 rich foods",
      "Hydrating fruits and vegetables",
      "Foods rich in vitamin E",
      "Limit dairy and processed sugars",
    ],
    routineSteps: {
      morning: [
        "Gentle cleanser",
        "Hydrating toner",
        "Moisturizer",
        "Sunscreen",
      ],
      evening: [
        "Oil-based cleanser",
        "Gentle cleanser",
        "Treatment serum",
        "Night cream",
      ],
    },
  };

  return (
    <div className="bg-gray-200 h-full w-full">
      <div className="max-w-6xl min-h-6xl mx-auto p-6 flex flex-col space-y-6">
        <header className="text-center mb-8">
          <div className="text-2xl">
            <GradientText text="Your Personalized Skincare Dashboard" />
          </div>
          <p className="text-gray-600">
            Based on AI analysis of your skin condition
          </p>
        </header>

        <Tabs defaultValue="overview" className="w-full flex-grow">
          <TabsList className="grid grid-cols-4 gap-4 mb-8">
            <TabsTrigger className="bg-gray-200" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger className="bg-gray-200" value="diet">
              Diet Plan
            </TabsTrigger>
            <TabsTrigger className="bg-gray-200" value="routine">
              Routine
            </TabsTrigger>
            <TabsTrigger className="bg-gray-200" value="products">
              Products
            </TabsTrigger>
          </TabsList>

          <div className="flex-grow h-screen">
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Skin Condition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium">
                      {responseData.dermaReport.report.overview.condition}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplet className="h-5 w-5" />
                      Hydration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-500 h-4 rounded-full"></div>
                      </div>
                      <span>70%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="diet">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Dietary Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {responseData.dermaReport.report.diet.recommendations.map(
                      (rec: any, index: any) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          {rec}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routine">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Morning Routine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {responseData.dermaReport.report.routine.morning.map(
                        (step: any, index: any) => (
                          <li key={index} className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        )
                      )}
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Evening Routine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {responseData.dermaReport.report.routine.evening.map(
                        (step: any, index: any) => (
                          <li key={index} className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-purple-600">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        )
                      )}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <ScrollArea className="h-screen bg-gray-200 rounded-lg p-4">
              <TabsContent value="products">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {productsData.map((product, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <CardTitle>{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span>${product.price}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {product.description}
                          </p>
                          <div>
                            <h4 className="font-medium mb-2">
                              Key Ingredients:
                            </h4>
                            <ul className="text-sm space-y-1">
                              {product.keyIngredients.map((ingredient, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                                  {ingredient}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SkincareAnalysisDashboard;

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api, Summary as SummaryType, Meal } from "@/lib/api";
import { FileText, Calendar, DollarSign, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

const Summary = () => {
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dateStr = new Date(Date.now()).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const today = dateStr.split("/").join("-");
    setDate(today);
    fetchSummary(today);
  }, []);

  const fetchSummary = async (dateStr: string) => {
    setLoading(true);
    try {
      const [summaryRes, mealRes] = await Promise.all([
        api.getSummaryByDate(dateStr),
        api.getMealByDate(dateStr),
      ]);

      console.log(summaryRes, mealRes)
      if (summaryRes.success && summaryRes.data) {
        setSummary(summaryRes.data);
      } else {
        setSummary(null);
      }

      if (mealRes.success && mealRes.data) {
        setMeal(mealRes.data);
      } else {
        setMeal(null);
      }
    } catch (error) {
      toast.error("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (date) {
      fetchSummary(date);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Daily Summary</h1>
          <p className="text-muted-foreground mt-2">
            View daily meal summaries and reports
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Select Date
            </CardTitle>
            <CardDescription>Enter date in format: DD-MM-YYYY</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="10-10-2025"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Summary Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4 border border-primary/20">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <span className="font-medium">Meal Rate</span>
                        </div>
                        <span className="text-xl font-bold">
                          ৳{summary.mealRate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-secondary/5 p-4 border border-secondary/20">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-secondary" />
                          <span className="font-medium">Total Money</span>
                        </div>
                        <span className="text-xl font-bold">
                          ৳{summary.totalMoney}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-accent/5 p-4 border border-accent/20">
                        <div className="flex items-center gap-3">
                          <UtensilsCrossed className="h-5 w-5 text-accent" />
                          <span className="font-medium">Total Meals</span>
                        </div>
                        <span className="text-xl font-bold">
                          {summary.totalMeal}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Generated on{" "}
                        {new Date(summary.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No summary available for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                  Meal Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {meal ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Menu</h3>
                      <div className="flex flex-wrap gap-2">
                        {meal.meals.map((item, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Ingredients</h3>
                      <div className="space-y-2">
                        {meal.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                          >
                            <div>
                              <p className="font-medium">{item.item}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">৳{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Type:</span>
                        <span className="font-bold text-primary">
                          {meal.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <UtensilsCrossed className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No meal available for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Summary;

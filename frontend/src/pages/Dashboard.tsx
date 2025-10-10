import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api, Meal } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { UtensilsCrossed, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayMeal();
  }, []);

  const fetchTodayMeal = async () => {
    try {
      const dateStr = new Date(Date.now()).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      const today = dateStr.split('/').join('-')
      console.log(today)
      const response = await api.getMealByDate(today);
      console.log(response)
      console.log(response.data)
      console.log("why it is not working")
      if (response.success && response.data) {
        setTodayMeal(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch today\'s meal');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = todayMeal?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">
            {user?.role === 'admin' && 'Manage students and generate daily summaries'}
            {user?.role === 'manager' && 'Create and manage daily meals'}
            {user?.role === 'student' && 'View and update your meal preferences'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Role</CardTitle>
                <UtensilsCrossed className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user?.role}</div>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Date</CardTitle>
                <Clock className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </CardContent>
          </Card>

          {todayMeal && (
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Total Cost</CardTitle>
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{totalCost.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-1">Today's meal</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              Today's Meal
            </CardTitle>
            <CardDescription>What's being served today</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : todayMeal ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Menu</h3>
                  <div className="flex flex-wrap gap-2">
                    {todayMeal.meals.map((meal, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {todayMeal.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                      >
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">৳{item.price}</p>
                          <p className="text-xs text-muted-foreground">per unit</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Meal Type:</span>
                    <span className="font-bold text-primary">{todayMeal.type}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <UtensilsCrossed className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No meal has been created for today yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

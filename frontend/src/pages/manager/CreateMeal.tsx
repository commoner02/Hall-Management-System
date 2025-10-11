import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api, MealItem } from '@/lib/api';
import { UtensilsCrossed, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mealTypes = ['Normal', 'Manager Special', 'Monthly Feast'];

const CreateMeal = () => {
  const [type, setType] = useState('Normal');
  const [meals, setMeals] = useState<string[]>(['']);
  const [items, setItems] = useState<MealItem[]>([{ item: '', price: 0, quantity: 0 }]);
  const [loading, setLoading] = useState(false);

  const addMeal = () => {
    setMeals([...meals, '']);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const updateMeal = (index: number, value: string) => {
    const newMeals = [...meals];
    newMeals[index] = value;
    setMeals(newMeals);
  };

  const addItem = () => {
    setItems([...items, { item: '', price: 0, quantity: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof MealItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.createMeal({
        type,
        items: items.filter((item) => item.item && item.price && item.quantity),
        meals: meals.filter((meal) => meal),
      });
      if (response.success) {
        toast.success('Meal created successfully');
        setType('Normal');
        setMeals(['']);
        setItems([{ item: '', price: 0, quantity: 0 }]);
      } else {
        toast.error(response.message || 'Failed to create meal');
      }
    } catch (error) {
      toast.error('Failed to create meal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Create Daily Meal</h1>
          <p className="text-muted-foreground mt-2">Set up today's meal menu and ingredients</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
                Meal Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a meal type" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((mealType) => (
                    <SelectItem key={mealType} value={mealType}>
                      {mealType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Add dishes that will be served</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {meals.map((meal, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Rice, Chicken Curry"
                    value={meal}
                    onChange={(e) => updateMeal(index, e.target.value)}
                  />
                  {meals.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeMeal(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addMeal} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Menu Item
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>Add ingredients with prices and quantities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-4">
                  <Input
                    placeholder="Item name"
                    value={item.item}
                    onChange={(e) => updateItem(index, 'item', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={item.price || ''}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                  />
                  {items.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addItem} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Meal'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateMeal;

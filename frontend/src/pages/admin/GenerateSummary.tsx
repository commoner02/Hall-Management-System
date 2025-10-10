import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { FileText, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mealRateOptions = [
  { label: 'Normal', value: '65' },
  { label: 'Manager Special', value: '90' },
  { label: 'Monthly Feast', value: '230' },
];

const GenerateSummary = () => {
  const [mealRate, setMealRate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.createSummary({ mealRate: parseFloat(mealRate) });
      if (response.success) {
        toast.success('Summary generated successfully');
        setMealRate('');
      } else {
        toast.error(response.message || 'Failed to generate summary');
      }
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Generate Daily Summary</h1>
          <p className="text-muted-foreground mt-2">Create a summary report for today's meals</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Summary Details
              </CardTitle>
              <CardDescription>Enter the meal rate to generate today's summary</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="mealRate" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Meal Rate (৳)
                  </Label>
                  <Select value={mealRate} onValueChange={setMealRate} required>
                    <SelectTrigger id="mealRate">
                      <SelectValue placeholder="Select a meal rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealRateOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} ({option.value}৳)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Select the rate per meal for today
                  </p>
                </div>

                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <h3 className="font-semibold mb-2">What happens next?</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• System calculates total cost from today's meal items</li>
                    <li>• Summary is generated with meal rate and costs</li>
                    <li>• Report becomes available in the Summary page</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Summary'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateSummary;

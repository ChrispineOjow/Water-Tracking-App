import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Spinner } from "./ui/spinner";

function EditReportModal({ isOpen, report, onClose, onSave, loading }) {
  const [formData, setFormData] = useState({
    waterAvailable: true,
    waterClean: true,
    description: ""
  });

  // Populate form when report changes
  useEffect(() => {
    if (report) {
      setFormData({
        waterAvailable: report.waterAvailable ?? true,
        waterClean: report.waterClean ?? true,
        description: report.description || ""
      });
    }
  }, [report, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "yes"
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Water Report</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Water Available */}
          <div className="space-y-3">
            <Label>Is water available?</Label>
            <RadioGroup
              value={formData.waterAvailable ? "yes" : "no"}
              onValueChange={(val) => handleRadioChange("waterAvailable", val)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="available-yes" />
                <Label htmlFor="available-yes" className="cursor-pointer">Yes, water is available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="available-no" />
                <Label htmlFor="available-no" className="cursor-pointer">No, water is not available</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Water Clean */}
          <div className="space-y-3">
            <Label>Is the water clean?</Label>
            <RadioGroup
              value={formData.waterClean ? "yes" : "no"}
              onValueChange={(val) => handleRadioChange("waterClean", val)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="clean-yes" />
                <Label htmlFor="clean-yes" className="cursor-pointer">Yes, water is clean</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="clean-no" />
                <Label htmlFor="clean-no" className="cursor-pointer">No, water is not clean</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any additional details about the water condition..."
              maxLength={500}
              rows={4}
            />
            <p className="text-sm text-gray-500">{formData.description.length}/500</p>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner className="mr-2" /> : null}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditReportModal;
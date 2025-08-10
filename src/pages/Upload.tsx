import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload as UploadIcon, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    price: string;
    description: string;
    concentration: string;
    size: string;
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
  }>({
    name: "",
    brand: "",
    price: "",
    description: "",
    concentration: "",
    size: "",
    topNotes: [""],
    middleNotes: [""],
    baseNotes: [""]
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNoteChange = (type: keyof Pick<typeof formData, 'topNotes' | 'middleNotes' | 'baseNotes'>, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((note: string, i: number) => 
        i === index ? value : note
      )
    }));
  };

  const addNote = (type: keyof Pick<typeof formData, 'topNotes' | 'middleNotes' | 'baseNotes'>) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ""]
    }));
  };

  const removeNote = (type: keyof Pick<typeof formData, 'topNotes' | 'middleNotes' | 'baseNotes'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_: string, i: number) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.brand || !formData.price || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one product image.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically upload to a server
    toast({
      title: "Product Added!",
      description: `${formData.name} has been successfully added to the catalog.`,
    });

    // Reset form
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      concentration: "",
      size: "",
      topNotes: [""],
      middleNotes: [""],
      baseNotes: [""]
    });
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-luxury-gold to-luxury-rose-gold bg-clip-text text-transparent">
              Add New Fragrance
            </h1>
            <p className="text-muted-foreground">
              Upload a new perfume to the collection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Noir Élégance"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="e.g., ÉLÉGANCE"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="189"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="concentration">Concentration</Label>
                    <Select value={formData.concentration} onValueChange={(value) => handleInputChange("concentration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select concentration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eau-de-parfum">Eau de Parfum</SelectItem>
                        <SelectItem value="eau-de-toilette">Eau de Toilette</SelectItem>
                        <SelectItem value="eau-de-cologne">Eau de Cologne</SelectItem>
                        <SelectItem value="parfum">Parfum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30ml">30ml</SelectItem>
                        <SelectItem value="50ml">50ml</SelectItem>
                        <SelectItem value="100ml">100ml</SelectItem>
                        <SelectItem value="150ml">150ml</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the fragrance, its character, and inspiration..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fragrance Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Fragrance Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(["topNotes", "middleNotes", "baseNotes"] as const).map((noteType) => (
                  <div key={noteType}>
                    <Label className="text-luxury-gold font-medium">
                      {noteType === "topNotes" ? "Top Notes" : 
                       noteType === "middleNotes" ? "Middle Notes" : "Base Notes"}
                    </Label>
                    <div className="space-y-2 mt-2">
                      {formData[noteType].map((note: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={note}
                            onChange={(e) => handleNoteChange(noteType, index, e.target.value)}
                            placeholder="Enter note"
                          />
                          {formData[noteType].length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeNote(noteType, index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addNote(noteType)}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images *</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <UploadIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="images" className="cursor-pointer">
                        <span className="text-luxury-gold hover:text-luxury-rose-gold font-medium">
                          Click to upload images
                        </span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB (Max 5 images)
                      </p>
                    </div>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              variant="luxury"
              className="w-full"
              size="lg"
            >
              Add Product to Catalog
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
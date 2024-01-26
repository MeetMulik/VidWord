import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddKey() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-foreground" variant="outline">
          Add keys
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add OpenAi & Gemini Api Keys</DialogTitle>
          <DialogDescription>
            Kindly add your OpenAI and Gemini API keys to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              OpenAI Key
            </Label>
            <Input id="openaiKey" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center  gap-4">
            <Label htmlFor="geminiKey" className="text-right">
              Gemini Key
            </Label>
            <Input id="geminiKey" defaultValue="" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save keys</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

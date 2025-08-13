"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type ReportProfileProps = {
  reportedUserId: string;
  reporterId: string;
  reportedUserName: string;
  reporterName: string;
};

export default function ReportProfile({ reportedUserId , reporterId ,reportedUserName,reporterName}: ReportProfileProps) {


  const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");


    const handleSubmit = async () => {
  if (!reason) {
    alert("Please select a reason before submitting.");
    return;
  }

  try {
    const res = await fetch(`${baseurl}/profile/report-user`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportedUserId,
        reporterId,
        reason,
        reportedUserName,
        reporterName,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Report submitted successfully.");
      setOpen(false);
      setReason("");
    } else {
      alert(data.message || "Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to submit report.");
  }
};

  

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        Report Profile
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Profile</DialogTitle>
            <DialogDescription>
              Please select the reason for reporting this profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>Reason</Label>
            <Select onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam or Scam</SelectItem>
                <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                <SelectItem value="fake">Fake Profile</SelectItem>
                <SelectItem value="harassment">Harassment or Bullying</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

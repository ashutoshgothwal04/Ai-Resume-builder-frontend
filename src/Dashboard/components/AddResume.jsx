import React, { useState } from "react";
import { Loader2, PlusSquareIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import GlobleApi from "../../../services/GlobleApi";
import { useNavigate } from "react-router-dom";


const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const Navigation = useNavigate()

  const CreateInput = async () => {
    setLoading(true);
    const uuid = uuidv4();

    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    console.log("Sending to Strapi:", JSON.stringify(data, null, 2));

    try {
      const resp = await GlobleApi.CreateNewResume(data);
      console.log("Success:", resp);
      const documentId = resp.data.data.documentId;
      setOpenDialog(false);
      Navigation('/dashboard/resume/' + documentId + '/edit');
    } catch (err) {
      console.error("Error creating resume:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-sm cursor-pointer hover:shadow-primary"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquareIcon />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              <h6>Add a title for your new resume</h6>
              <Input
                className="m-2"
                placeholder="(e.g. Full Stack resume)"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 mt-4">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={CreateInput}
                disabled={!resumeTitle || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteStartup } from "@/lib/actions";

export default function DeleteStartupButton({ startupId }: { startupId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this startup?")) return;

    startTransition(async () => {
      await deleteStartup(startupId);
      router.push("/");
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Startup"}
    </button>
  );
}

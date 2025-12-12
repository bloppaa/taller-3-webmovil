"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  resetFilters,
  setRegion,
  setSearch,
  setStatus,
  setType,
} from "@/lib/features/filters/filterSlice";
import { RootState } from "@/lib/store";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-card p-4 rounded-lg border shadow-sm items-center">
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search servers or regions..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="pl-8"
        />
      </div>

      <div className="flex w-full md:w-auto gap-2 overflow-x-auto pb-2 md:pb-0">
        <Select
          value={filters.status}
          onValueChange={(val) => dispatch(setStatus(val))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Down">Down</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={(val) => dispatch(setType(val))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Database">Database</SelectItem>
            <SelectItem value="Web">Web</SelectItem>
            <SelectItem value="Worker">Worker</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.region}
          onValueChange={(val) => dispatch(setRegion(val))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Regions</SelectItem>
            <SelectItem value="US-East">US-East</SelectItem>
            <SelectItem value="US-West">US-West</SelectItem>
            <SelectItem value="EU-Central">EU-Central</SelectItem>
            <SelectItem value="EU-West">EU-West</SelectItem>
            <SelectItem value="SA-East">SA-East</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={() => dispatch(resetFilters())}
        className="w-full md:w-auto"
      >
        Reset
      </Button>
    </div>
  );
}

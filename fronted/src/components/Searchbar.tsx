import { Input } from "./ui/input";

export const Searchbar = () => {
    return (
        <div className="flex flex-row gap-2">
            <Input type="text" placeholder="Buscar estudiante" className="rounded-full" />
        </div>
    )
}

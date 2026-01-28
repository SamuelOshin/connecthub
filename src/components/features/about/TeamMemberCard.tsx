interface TeamMemberCardProps {
  image: string;
  name: string;
  role: string;
}

export function TeamMemberCard({ image, name, role }: TeamMemberCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        className="size-32 lg:size-40 rounded-full bg-cover bg-center border-4 border-primary/10"
        style={{ backgroundImage: `url("${image}")` }}
        role="img"
        aria-label={`Headshot of ${name}`}
      />
      <div>
        <h4 className="text-[#111418] dark:text-white font-bold text-lg">{name}</h4>
        <p className="text-primary text-sm font-medium">{role}</p>
      </div>
    </div>
  );
}

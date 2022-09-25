interface Props {
  tags: string[];
  classes?: string;
}

export const RecipeTags: React.FC<Props> = ({ tags, classes }: Props) => {
  return (
    <div className={`flex gap-2 mt-2 ${classes ?? ""}`}>
      {tags.map((tag: string) => {
        return (
          <p
            key={tag}
            className="px-4 py-0.5 bg-purple-500/50 border border-purple-700 text-sm rounded-full"
          >
            {tag}
          </p>
        );
      })}
    </div>
  );
};

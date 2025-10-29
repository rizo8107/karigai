import { BuilderComponent as BuilderComponentBase, useIsPreviewing } from '@builder.io/react';
import { BUILDER_API_KEY } from '@/lib/builder';

interface BuilderComponentProps {
  model: string;
  content?: any;
  apiKey?: string;
  customClassName?: string;
}

export function BuilderComponent({
  model,
  content,
  apiKey = BUILDER_API_KEY,
  customClassName
}: BuilderComponentProps) {
  const isPreviewing = useIsPreviewing();

  if (!content && !isPreviewing) {
    return null;
  }

  return (
    <div className={customClassName}>
      <BuilderComponentBase
        model={model}
        content={content || undefined}
        apiKey={apiKey}
      />
    </div>
  );
}

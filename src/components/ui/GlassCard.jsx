/**
 * Frosted glass surface — the base building block of the Aurora UI.
 * `glow` adds the violet edge bloom; `hover` enables the interactive lift.
 */
const GlassCard = ({
  children,
  className = "",
  glow = false,
  hover = false,
  as: Tag = "div",
  ...props
}) => {
  return (
    <Tag
      className={`relative rounded-2xl glass ${hover ? "glass-hover" : ""} ${
        glow ? "glow-primary" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default GlassCard;

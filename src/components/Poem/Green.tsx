export const Green: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <p
      className="text-[#30F628]"
      style={{
        textShadow: "1px 3px 3px #122611",
      }}
    >
      {children}
    </p>
  )
}

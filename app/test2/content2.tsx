export default function ExamplePage() {
  return (
    <div className="w-[30vw] min-h-[200px] p-[4px] bg-black relative">
      <div 
        className="w-full h-full bg-black"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, 
              #555555 0, #555555 4px, 
              transparent 4px, transparent 8px,
              #555555 8px, #555555 16px, 
              transparent 16px, transparent 24px
            ),
            repeating-linear-gradient(to bottom, 
              #555555 0, #555555 4px, 
              transparent 4px, transparent 8px,
              #555555 8px, #555555 16px, 
              transparent 16px, transparent 24px
            )
          `,
          backgroundPosition: '0 0, 0 0',
          backgroundSize: '24px 4px, 4px 24px',
          padding: '4px',
          border: '4px solid transparent',
          position: 'absolute',
          inset: 0,
          backgroundRepeat: 'repeat-x, repeat-y',
          backgroundClip: 'content-box, content-box'
        }}
      >
        {/* Bottom border */}
        <div 
          className="absolute -bottom-[4px] -right-[4px] -left-[4px]"
          style={{
            height: '4px',
            backgroundImage: `
              repeating-linear-gradient(to right, 
                #555555 0, #555555 4px, 
                transparent 4px, transparent 8px,
                #555555 8px, #555555 16px, 
                transparent 16px, transparent 24px
              )
            `,
          }}
        />
        {/* Top border */}
        <div 
          className="absolute -top-[4px] -right-[4px] -left-[4px]"
          style={{
            height: '4px',
            backgroundImage: `
              repeating-linear-gradient(to right, 
                #555555 0, #555555 4px, 
                transparent 4px, transparent 8px,
                #555555 8px, #555555 16px, 
                transparent 16px, transparent 24px
              )
            `,
          }}
        />
        {/* Left border */}
        <div 
          className="absolute -left-[4px] -top-[4px] -bottom-[4px]"
          style={{
            width: '4px',
            backgroundImage: `
              repeating-linear-gradient(to bottom, 
                #555555 0, #555555 4px, 
                transparent 4px, transparent 8px,
                #555555 8px, #555555 16px, 
                transparent 16px, transparent 24px
              )
            `,
          }}
        />

        <div 
          className="absolute -right-[4px] -top-[4px] -bottom-[4px]"
          style={{
            width: '4px',
            backgroundImage: `
              repeating-linear-gradient(to bottom, 
                #555555 0, #555555 4px, 
                transparent 4px, transparent 8px,
                #555555 8px, #555555 16px, 
                transparent 16px, transparent 24px
              )
            `,
          }}
        />
      </div>
    </div>
  )
}
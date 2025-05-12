interface HourTickProps {
    x: number;
    y: number;
    payload: any;
    data: any[];
}

export const HourTick = ({ x, y, payload, data }: HourTickProps) => {
    const iconObj = data.find(item => item.hour === payload.value);
    const iconUrl = iconObj?.icon;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={12} textAnchor="middle" fill="#000" fontSize={12} className="font-semibold">
                {payload.value}
            </text>
            <foreignObject x={-20} y={14} width={50} height={32} style={{ overflow: 'visible' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {iconUrl && (
                        <img
                            src={iconUrl.startsWith('http') ? iconUrl : `https:${iconUrl}`}
                            width={50}
                            height={50}
                        />
                    )}
                </div>
            </foreignObject>
        </g>
    );
};
import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import RemarkComp from "./RemarkComp.tsx";

interface EndRegCompProps {
    titleEndTime: string;
    titleEndKm: string;
    titleRemark: string;
    timeEnd: string;
    kmEnd: string;
    remarkVal: string;
    errorTimeMessage?: string;
    errorKmMessage?: string;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
    onRemarkChange: (remarkValue: string) => void;
}


// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ time, km, onTimeChange, onKmChange }).
const EndRegComp: React.FC<EndRegCompProps> = ({ 
    titleEndTime, titleEndKm, titleRemark, timeEnd, kmEnd, remarkVal, errorTimeMessage, errorKmMessage, onTimeChange, onKmChange, onRemarkChange 
}) => {

    
    return (

        <div className='regComponent-wrapper'>
            <TimeComp title={titleEndTime}
                      value={timeEnd}
                      errorMessage={errorTimeMessage}
                      onTimeChange={onTimeChange}/>

            <KmComp title={titleEndKm}
                    value={kmEnd}
                    errorMessage={errorKmMessage}
                    onKmChange={onKmChange}/>
            
            <RemarkComp title={titleRemark}
                        value={remarkVal}
                        onChange={onRemarkChange}
            />
                        
        </div>
    );

}

export default EndRegComp;
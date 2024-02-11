import '../../styles/Archive/ArchiveMain.css';
import ArchiveContent from './ArchiveContent/ArchiveContent';

const ArchiveMain = () => {
    return (
      <div className="archive-main">
        {/*title */}
        <span className="archive-main-title">آرشیو من</span>
        {/*headers */}
        <div className="archive-main-header">
          <div className="space-before"></div>
          <span className="name-column">نام فایل</span>
          <span className="date-column">تاریخ بارگذاری</span>
          <span className="type-column">نوع فایل</span>
          <span className="duration-column">مدت زمان</span>
          <div className="space-after"></div>
        </div>
       <ArchiveContent />
      </div>
    );
  };
  
  export default ArchiveMain;
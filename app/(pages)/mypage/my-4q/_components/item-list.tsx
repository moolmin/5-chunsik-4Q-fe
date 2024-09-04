import styles from './item-list.module.css'
import { List, Button, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { IoIosCalendar } from "react-icons/io";


const handleDownload = async (item) => {
    if (item.ticketUrl) {
        try {
            const response = await fetch(item.ticketUrl, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `photoQR_${item.title}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    } else {
        console.error('Image URL is not available for download.');
    }
};


// ListItem Component
const ItemList = ({ item }) => (
    <List.Item
        key={item.title}
    >
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.imgContainer}>
                    <img
                        width={150}
                        height={150}
                        alt="my 4q tickets"
                        src={item.ticketUrl}
                        style={{ backgroundColor: 'grey' }}
                    />
                </div>
                <span className={styles.title}>{item.title}</span>
            </div>
            <div className={styles.infoConatiner}>
                <div className={styles.categoryGroup}>
                <Tag>{item.categoryName}</Tag>
                    {/* <span>{item.categoryName}</span> */}
                </div>
                <div className={styles.dateGroup}>
                    <IoIosCalendar />
                    <span>{item.formattedDate}</span>
                </div>
                <div className={styles.downloadBtnContainer}>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={() => handleDownload(item)}>
                        다운로드
                    </Button>
                </div>
            </div>
        </div>
    </List.Item>
);

export default ItemList;

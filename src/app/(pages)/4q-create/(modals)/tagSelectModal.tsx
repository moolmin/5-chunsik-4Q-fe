import React, { useState, useEffect } from "react";
import { Button, Alert } from "antd";
import styles from "./tagSelectModal.module.css";
import hot_mark from "../../../../../public/images/hot_tag.png";
import tagTranslationMap from "@/lib/tagTranslationKrEn";

interface TagSelectorProps {
  selectedTags: string[];
  onSelect: (selectedTags: string[]) => void;
}

export default function TagSelector({
  selectedTags,
  onSelect,
}: TagSelectorProps) {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(
    selectedTags.map((tag) => tagTranslationMap[tag] || tag)
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const MAX_TAGS = 3;

  const moodTags = [
    "고전",
    "귀여움",
    "꽃무늬",
    "네온",
    "도시",
    "시골",
    "밝은",
    "어두운",
    "빈티지",
    "심플",
    "럭셔리",
    "자연친화적",
  ];
  const colorTags = [
    "블루",
    "그린",
    "레드",
    "옐로우",
    "퍼플",
    "블랙",
    "화이트",
    "흑백",
  ];
  const seasonTags = ["봄", "여름", "가을", "겨울"];

  const isHotTag = (tag: string) => {
    const hotTags = ["네온", "겨울", "그린", "밝은", "심플", "화이트"];
    return hotTags.includes(tag);
  };

  useEffect(() => {
    setLocalSelectedTags(
      selectedTags.map((tag) => tagTranslationMap[tag] || tag)
    );
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    const translatedTag = tagTranslationMap[tag];
    if (!translatedTag) return;

    if (localSelectedTags.includes(translatedTag)) {
      setLocalSelectedTags(
        localSelectedTags.filter((t) => t !== translatedTag)
      );
      setShowAlert(false);
    } else if (localSelectedTags.length < MAX_TAGS) {
      setLocalSelectedTags([...localSelectedTags, translatedTag]);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleConfirm = () => {
    onSelect(localSelectedTags);
  };

  return (
    <div className={styles.container}>
      {showAlert && (
        <Alert
          message={`태그는 최대 ${MAX_TAGS}개까지 선택 가능합니다.`}
          type="warning"
          showIcon
        />
      )}
      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>분위기</div>
        <div className={styles.tagItemContainer}>
          {moodTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>색상</div>
        <div className={styles.tagItemContainer}>
          {colorTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tagList}>
        <div className={styles.tagListTitle}>계절</div>
        <div className={styles.tagItemContainer}>
          {seasonTags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tagItem} ${
                localSelectedTags.includes(tagTranslationMap[tag])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {isHotTag(tag) && (
                <img
                  src={hot_mark.src}
                  alt="hot Mark"
                  className={styles.hotMark}
                />
              )}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          type="primary"
          onClick={handleConfirm}
          size="middle"
          className={styles.subBtn}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}

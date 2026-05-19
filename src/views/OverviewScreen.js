import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';
import MedicalDatabase from '../../data/database.json';

const organImages = {
  'circulatory': require('../../assets/heart.png'),
  'respiratory': require('../../assets/lungs.png'),
  'digestive': require('../../assets/stomach.png'),
  'skeletal': require('../../assets/skeleton.png'),
  'muscular': require('../../assets/muscular.png'),
  'excretory': require('../../assets/kidney.png'),
};

const getMajorParts = (sys) => {
  switch (sys) {
    case 'circulatory':
      return [
        { umum: "Pembuluh Nadi Besar", medis: "Aorta", desc: "Pembuluh arteri terbesar yang mengalirkan darah bersih kaya oksigen keluar dari bilik kiri.", top: "25%", left: "55%" },
        { umum: "Serambi Jantung", medis: "Atrium", desc: "Ruang atas jantung yang menerima darah kotor dari tubuh (atrium kanan) atau darah bersih dari paru (atrium kiri).", top: "40%", left: "35%" },
        { umum: "Katup Jantung", medis: "Valvula", desc: "Struktur sekat dalam bilik jantung yang mencegah darah mengalir kembali ke arah salah.", top: "50%", left: "50%" },
        { umum: "Bilik Jantung", medis: "Ventriculus Cordis", desc: "Ruang bawah berotot tebal untuk memompa darah ke paru-paru (bilik kanan) atau seluruh tubuh (bilik kiri).", top: "70%", left: "60%" },
        { umum: "Jantung Keseluruhan", medis: "Cor", desc: "Organ berotot utama yang memompa darah ke seluruh tubuh melalui denyut ritmis.", top: "85%", left: "45%" }
      ];
    case 'respiratory':
      return [
        { umum: "Batang Tenggorokan", medis: "Trakea", desc: "Pipa napas berstruktur cincin tulang rawan elastis untuk menyalurkan udara ke paru-paru.", top: "20%", left: "50%" },
        { umum: "Kantung Udara", medis: "Alveolus", desc: "Kantung udara mikroskopis di paru-paru tempat terjadinya pertukaran difusi gas O2 dan CO2.", top: "60%", left: "25%" },
        { umum: "Rongga Hidung", medis: "Cavum Nasalis", desc: "Tempat awal masuknya udara pernapasan untuk disaring, dihangatkan, dan dilembapkan.", top: "10%", left: "50%" },
        { umum: "Otot Sekat Dada", medis: "Diaphragma", desc: "Sekat rongga badan pembatas dada dan perut yang bertindak sebagai otot utama pernapasan.", top: "85%", left: "50%" },
        { umum: "Pangkal Tenggorokan", medis: "Laring", desc: "Saluran pernapasan yang menjadi tempat pita suara dan gerbang udara menuju paru-paru.", top: "35%", left: "50%" }
      ];
    case 'digestive':
      return [
        { umum: "Kerongkongan", medis: "Esophagus", desc: "Saluran otot elastis yang menggerakkan makanan menuju lambung menggunakan gerak peristaltik.", top: "20%", left: "50%" },
        { umum: "Hati", medis: "Hepar / Liver", desc: "Kelenjar metabolisme terbesar yang menyaring toksin darah dan memproduksi zat empedu.", top: "45%", left: "30%" },
        { umum: "Lambung", medis: "Gaster", desc: "Organ kantung pencernaan kimiawi dengan sekresi asam klorida dan enzim pepsin.", top: "50%", left: "65%" },
        { umum: "Usus Halus", medis: "Intestinum Tenue", desc: "Saluran terpanjang tempat penyerapan sari pati nutrisi utama makanan.", top: "70%", left: "50%" },
        { umum: "Usus Besar", medis: "Intestinum Crassum", desc: "Saluran penyerapan sisa cairan air mineral dan pembusukan feses makanan oleh bakteri.", top: "85%", left: "50%" }
      ];
    case 'skeletal':
      return [
        { umum: "Tulang Tengkorak", medis: "Cranium", desc: "Tulang keras pelindung organ otak utama dari trauma fisik luar.", top: "15%", left: "50%" },
        { umum: "Tulang Rusuk", medis: "Costae", desc: "Tulang lengkung dada pelindung organ vital (jantung & paru) di rongga dada.", top: "35%", left: "50%" },
        { umum: "Tulang Belakang", medis: "Vertebrae", desc: "Ruas-ruas tulang keras pembentuk poros tubuh pelindung sumsum saraf pusat.", top: "55%", left: "50%" },
        { umum: "Tulang Paha", medis: "Femur", desc: "Tulang pipa terpanjang dan terkuat yang menyangga struktur paha anggota gerak bawah.", top: "75%", left: "40%" },
        { umum: "Tulang Kering", medis: "Tibia", desc: "Tulang pipa besar kaki depan bawah penopang beban tubuh utama.", top: "85%", left: "60%" }
      ];
    case 'muscular':
      return [
        { umum: "Otot Bahu", medis: "Musculus Deltoideus", desc: "Otot segitiga tebal pembungkus sendi bahu untuk mengangkat lengan atas.", top: "25%", left: "30%" },
        { umum: "Otot Dada Besar", medis: "Musculus Pectoralis Major", desc: "Otot kipas tebal penyusun utama dada atas pria maupun wanita.", top: "35%", left: "50%" },
        { umum: "Otot Lengan Depan", medis: "Musculus Biceps Brachii", desc: "Otot lengan atas bagian depan pembantu gerak fleksi menekuk sendi siku.", top: "50%", left: "25%" },
        { umum: "Otot Lengan Belakang", medis: "Musculus Triceps Brachii", desc: "Otot lengan atas belakang pembantu gerak ekstensi meluruskan sendi siku.", top: "50%", left: "75%" },
        { umum: "Otot Rangka / Lurik", medis: "Textus Muscularis Striatus", desc: "Otot sadar berserat terang-gelap yang menempel pada rangka untuk mobilisasi tubuh.", top: "75%", left: "50%" }
      ];
    case 'excretory':
      return [
        { umum: "Ginjal", medis: "Ren / Kidney", desc: "Organ penyaring racun dan urea darah untuk memproduksi zat urine sekresi luring.", top: "45%", left: "35%" },
        { umum: "Struktur Penyaring", medis: "Glomerulus", desc: "Pembuluh kapiler penyaring partikel kotoran darah tahap filtrasi utama di ginjal.", top: "45%", left: "65%" },
        { umum: "Saluran Ginjal", medis: "Ureter", desc: "Sepasang pipa otot yang mengalirkan urine dari renal ginjal menuju kantung kemih.", top: "65%", left: "50%" },
        { umum: "Kantung Kemih", medis: "Vesica Urinaria", desc: "Kantung otot penampung cairan urine sebelum dikeluarkan melalui proses ekskresi.", top: "85%", left: "50%" },
        { umum: "Kulit", medis: "Cutis", desc: "Lapisan terluas pelindung tubuh dari panas luar dan sekresi keringat.", top: "15%", left: "20%" }
      ];
    default:
      return [];
  }
};

export default function OverviewScreen({ controller }) {
  const [activePartIdx, setActivePartIdx] = useState(0);
  const systemTerms = MedicalDatabase.filter(item => item.sys === controller.activeStudySystem);
  
  const filteredTerms = systemTerms.filter(item => 
    item.umum.toLowerCase().includes(controller.dictionarySearch.toLowerCase()) ||
    item.medis.toLowerCase().includes(controller.dictionarySearch.toLowerCase())
  );

  const currentFlashcard = systemTerms[controller.flashcardIndex] || systemTerms[0];

  return (
    <View style={styles.screenContainer}>
      {/* Safe Area Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('organ-selection')}>
          <Ionicons name="arrow-back" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{controller.getSystemCleanName(controller.activeStudySystem)}</Text>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('quiz-setup')}>
          <Ionicons name="trophy" size={20} color="#FF9F43" />
        </TouchableOpacity>
      </View>

      {/* 3 tabs navigator pills */}
      <View style={styles.studyTabsRow}>
        {[
          { tabKey: 'atlas', label: 'Atlas Visual', icon: 'map' },
          { tabKey: 'kamus', label: 'Kamus PDF', icon: 'book' },
          { tabKey: 'kartu', label: 'Kartu Flash', icon: 'albums' }
        ].map(btn => (
          <TouchableOpacity
            key={btn.tabKey}
            style={[styles.studyTabBtn, controller.studyTab === btn.tabKey && styles.studyTabBtnActive]}
            onPress={() => controller.setStudyTab(btn.tabKey)}
          >
            <Ionicons name={btn.icon} size={14} color={controller.studyTab === btn.tabKey ? '#FFFFFF' : '#718096'} style={{ marginRight: 6 }} />
            <Text style={[styles.studyTabBtnText, controller.studyTab === btn.tabKey && styles.studyTabBtnTextActive]}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TAB 1: ATLAS VISUAL MAP (INTERACTIVE HOTSPOTS) */}
      {controller.studyTab === 'atlas' && (
        <ScrollView style={styles.atlasContainer} contentContainerStyle={{ paddingBottom: 40 }}>
          
          <View style={styles.interactiveAtlasContainer}>
            <View style={styles.hudBadge}>
              <View style={styles.hudDot} />
              <Text style={styles.hudText}>Interactive Hotspot Map</Text>
            </View>

            {organImages[controller.activeStudySystem] && (
              <Image 
                source={organImages[controller.activeStudySystem]} 
                style={styles.interactiveOrganImg} 
                resizeMode="contain"
              />
            )}

            {/* Render dynamic clickable hotspots */}
            {getMajorParts(controller.activeStudySystem).map((part, idx) => {
              const isActive = activePartIdx === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.atlasHotspot, 
                    { top: part.top, left: part.left },
                    isActive && styles.atlasHotspotActive
                  ]}
                  onPress={() => {
                    setActivePartIdx(idx);
                    controller.speakText(part.medis); // Speak Latin term on category selection!
                  }}
                >
                  <View style={isActive ? styles.hotspotInnerActive : styles.hotspotInner} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Interactive HUD card */}
          {(() => {
            const parts = getMajorParts(controller.activeStudySystem);
            const activePart = parts[activePartIdx] || parts[0];
            if (!activePart) return null;

            return (
              <View style={styles.atlasHudCard}>
                <View style={styles.atlasHudHeader}>
                  <Text style={styles.atlasHudTitle}>{activePart.umum}</Text>
                  <View style={styles.atlasHudMedisBadge}>
                    <Text style={styles.atlasHudMedisText}>{activePart.medis}</Text>
                  </View>
                </View>
                <Text style={styles.atlasHudDesc}>{activePart.desc}</Text>
                
                <View style={styles.atlasHudActions}>
                  <TouchableOpacity
                    style={[styles.btnFilledTeal, { flex: 1, height: 40 }]}
                    onPress={() => controller.speakText(activePart.medis)}
                  >
                    <Ionicons name="volume-medium" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.btnFilledTealText}>Lafalkan 🔊</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btnOutlinedSecondary, { flex: 1, height: 40 }]}
                    onPress={() => controller.jumpToFlashcard(activePart.umum)}
                  >
                    <Ionicons name="albums" size={16} color="#2C3E50" style={{ marginRight: 6 }} />
                    <Text style={styles.btnOutlinedSecondaryText}>Kartu Flash 🎴</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })()}
            );
          })()}
        </ScrollView>
      )}

      {/* TAB 2: SEARCHABLE KAMUS KEDOKTERAN (100 TERMS) */}
      {controller.studyTab === 'kamus' && (
        <View style={{ flex: 1 }}>
          <View style={styles.kamusSearchBox}>
            <Ionicons name="search" size={16} color="#718096" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Cari nama umum atau medis..."
              placeholderTextColor="#718096"
              value={controller.dictionarySearch}
              onChangeText={controller.setDictionarySearch}
              style={styles.kamusSearchInput}
            />
            {controller.dictionarySearch !== '' && (
              <TouchableOpacity onPress={() => controller.setDictionarySearch('')}>
                <Ionicons name="close" size={16} color="#718096" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {filteredTerms.length === 0 ? (
              <Text style={styles.emptySearchText}>Tidak ada istilah medis yang cocok.</Text>
            ) : (
              filteredTerms.map((term, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.termListCard}
                  onPress={() => controller.jumpToFlashcard(term.umum)}
                >
                  <View style={styles.termListHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, flexWrap: 'wrap', gap: 8 }}>
                      <Text style={styles.termUmumText}>{term.umum}</Text>
                      <TouchableOpacity 
                        style={styles.speakBtn} 
                        onPress={() => controller.speakText(term.medis)}
                      >
                        <Ionicons name="volume-medium" size={16} color="#00A896" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.termMedisBadge}>
                      <Text style={styles.termMedisText}>{term.medis}</Text>
                    </View>
                  </View>
                  <Text style={styles.termDescText}>{term.desc}</Text>
                </TouchableOpacity>
              ))
            )}
              ))
            )}
          </ScrollView>
        </View>
      )}

      {/* TAB 3: DIGITAL FLASHCARDS FLIP STUDY DECK */}
      {controller.studyTab === 'kartu' && (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <Text style={styles.flashcardProgressText}>
            Dek Kartu: {controller.flashcardIndex + 1} dari {systemTerms.length} istilah
          </Text>

          <TouchableOpacity
            activeOpacity={0.95}
            style={[styles.flashcardContainer, controller.flashcardFlipped && styles.flashcardContainerFlipped]}
            onPress={() => controller.setFlashcardFlipped(!controller.flashcardFlipped)}
          >
            {!controller.flashcardFlipped ? (
              /* Front side (Bahasa Umum + Image!) */
              <View style={styles.flashcardContent}>
                {organImages[controller.activeStudySystem] && (
                  <View style={styles.atlasImageWrapper}>
                    <Image 
                      source={organImages[controller.activeStudySystem]} 
                      style={styles.atlasOrganImg} 
                      resizeMode="contain"
                    />
                  </View>
                )}
                <Text style={styles.flashcardTitle}>Nama Umum Organ</Text>
                <Text style={styles.flashcardMainWord}>{currentFlashcard.umum}</Text>
                <Text style={styles.flashcardTip}>Sentuh kartu untuk membuka istilah medis kedokteran</Text>
              </View>
            ) : (
              /* Back side (Bahasa Medis + Fungsi + Image) */
              <View style={styles.flashcardContent}>
                <TouchableOpacity 
                  style={styles.flashcardSpeakBtn} 
                  onPress={() => controller.speakText(currentFlashcard.medis)}
                >
                  <Ionicons name="volume-high" size={24} color="#FF9F43" />
                </TouchableOpacity>
                {organImages[controller.activeStudySystem] && (
                  <View style={[styles.atlasImageWrapper, { marginBottom: 6 }]}>
                    <Image 
                      source={organImages[controller.activeStudySystem]} 
                      style={styles.atlasOrganImg} 
                      resizeMode="contain"
                    />
                  </View>
                )}
                <Text style={styles.flashcardMedisTitle}>Nama Medis / Latin</Text>
                <Text style={styles.flashcardMedisWord}>{currentFlashcard.medis}</Text>
                <View style={styles.flashcardDivider} />
                <Text style={styles.flashcardDesc}>{currentFlashcard.desc}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Simple Premium Slide Deck Switcher - No track overlays! */}
          <View style={styles.flashcardActions}>
            <TouchableOpacity
              style={[styles.btnOutlinedSecondary, { flex: 1 }]}
              onPress={controller.prevFlashcard}
            >
              <Ionicons name="arrow-back" size={16} color="#2C3E50" style={{ marginRight: 6 }} />
              <Text style={styles.btnOutlinedSecondaryText}>Sebelumnya</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.btnFilledTeal, { flex: 1 }]}
              onPress={controller.nextFlashcard}
            >
              <Text style={styles.btnFilledTealText}>Berikutnya</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

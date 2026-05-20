import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IS_ANDROID = Platform.OS === 'android';
const STATUSBAR_PADDING = IS_ANDROID ? (StatusBar.currentHeight || 24) : 0;

export { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_PADDING };

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2C3E50'
  },
  viewport: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderLeftWidth: SCREEN_WIDTH > 600 ? 1.5 : 0,
    borderRightWidth: SCREEN_WIDTH > 600 ? 1.5 : 0,
    borderColor: '#E2E8F0',
    borderRadius: SCREEN_WIDTH > 600 ? 20 : 0,
    overflow: 'hidden',
    marginVertical: SCREEN_WIDTH > 600 ? 12 : 0
  },
  screenScroll: {
    flex: 1
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  dashHeader: {
    backgroundColor: '#2C3E50',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative'
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  helloText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginTop: 2
  },
  avatarContainer: {
    position: 'relative'
  },
  avatarMock: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00A896',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecgWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginTop: 16,
    alignSelf: 'center'
  },
  ecgLinesBox: {
    width: 60,
    height: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    marginRight: 6
  },
  ecgAnimateContainer: {
    width: 200,
    flexDirection: 'row'
  },
  ecgBpmText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2ECC71'
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
    zIndex: 10
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#2D3748',
    padding: 0
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12
  },
  menuCard: {
    width: '48%',
    minWidth: 150,
    maxWidth: 250,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 2
  },
  tealBorder: { borderLeftColor: '#00A896' },
  orangeBorder: { borderLeftColor: '#FF9F43' },
  blueBorder: { borderLeftColor: '#3498DB' },
  purpleBorder: { borderLeftColor: '#9B5DE5' },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  menuCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  menuCardDesc: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
    lineHeight: 12
  },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1
  },
  cardBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  cardBoxTag: {
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#00A896',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase'
  },
  cardBoxExp: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#718096'
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  questText: {
    fontSize: 11,
    color: '#2D3748',
    marginLeft: 8,
    fontWeight: '500'
  },
  questLink: {
    color: '#00A896',
    fontWeight: 'bold'
  },
  progressCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50',
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressCardBadge: {
    fontSize: 10,
    color: '#00A896',
    backgroundColor: 'rgba(0,168,150,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: '600'
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00A896',
    borderRadius: 4
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  progressStatsText: {
    fontSize: 11,
    color: '#718096'
  },
  chartBarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
    paddingTop: 10,
    paddingBottom: 6
  },
  chartBarCol: {
    alignItems: 'center',
    flex: 1
  },
  chartBarFill: {
    width: 14,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 4
  },
  chartBarDay: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#718096',
    marginTop: 4
  },
  navHeader: {
    minHeight: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 8
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  organGridHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#718096',
    marginBottom: 14
  },
  organGridScroll: {
    padding: 16
  },
  organGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    paddingBottom: 20
  },
  organCard: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1
  },
  organIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
    marginBottom: 10
  },
  organCardLabel: {
    fontSize: 11.5,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 14,
    height: 28
  },
  organCardProgressContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  organCardProgressBarBg: {
    width: '85%',
    height: 4,
    backgroundColor: '#EDF2F7',
    borderRadius: 2,
    overflow: 'hidden'
  },
  organCardProgressBarFill: {
    height: '100%',
    borderRadius: 2
  },
  organCardProgressText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#718096',
    marginTop: 4
  },
  studyTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 8,
    justifyContent: 'space-around'
  },
  studyTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8F9FA'
  },
  studyTabBtnActive: {
    backgroundColor: '#00A896',
    borderColor: '#00A896'
  },
  studyTabBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#718096'
  },
  studyTabBtnTextActive: {
    color: '#FFFFFF'
  },
  anatomyMapContainer: {
    height: 310,
    backgroundColor: '#EDF2F7',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  hudBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20
  },
  hudDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A896',
    marginRight: 6
  },
  hudText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold'
  },
  torsoSvg: {
    maxHeight: 280
  },
  pinpoint: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0, 168, 150, 0.15)',
    borderWidth: 2,
    borderColor: '#00A896',
    zIndex: 30
  },
  atlasPilsDesc: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  atlasDescTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6
  },
  atlasDescText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#718096',
    fontWeight: '500'
  },
  kamusSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  kamusSearchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#2D3748',
    padding: 0
  },
  emptySearchText: {
    textAlign: 'center',
    fontSize: 12.5,
    color: '#718096',
    marginTop: 40,
    fontWeight: 'bold'
  },
  termListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 1.5,
    elevation: 1
  },
  termListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  termUmumText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  termMedisBadge: {
    backgroundColor: 'rgba(0, 168, 150, 0.08)',
    borderColor: '#00A896',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  termMedisText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00A896'
  },
  termDescText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#718096',
    fontWeight: '500'
  },
  speakBtn: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 168, 150, 0.06)'
  },
  flashcardProgressText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#718096',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16
  },
  flashcardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    minHeight: 300,
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20
  },
  flashcardContainerFlipped: {
    borderColor: '#FF9F43',
    borderWidth: 1.5
  },
  flashcardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative'
  },
  flashcardSpeakBtn: {
    position: 'absolute',
    top: -24,
    right: -10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 159, 67, 0.08)'
  },
  flashcardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 10
  },
  flashcardMainWord: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginVertical: 14,
    textAlign: 'center'
  },
  flashcardTip: {
    fontSize: 9.5,
    color: '#A0AEC0',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flashcardMedisTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF9F43',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 10
  },
  flashcardMedisWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9F43',
    marginVertical: 6,
    textAlign: 'center'
  },
  flashcardDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 10
  },
  flashcardDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: '#718096',
    textAlign: 'center',
    fontWeight: '500'
  },
  flashcardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12
  },
  flashBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 12,
    borderWidth: 1
  },
  flashBtnIncorrect: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7'
  },
  flashBtnIncorrectText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E63946',
    marginLeft: 6
  },
  flashBtnCorrect: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5'
  },
  flashBtnCorrectText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginLeft: 6
  },
  setupHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  setupSubheading: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 20,
    fontWeight: '500'
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16
  },
  settingLabel: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingOptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  settingOptionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8F9FA'
  },
  settingOptionBtnActive: {
    backgroundColor: '#00A896',
    borderColor: '#00A896'
  },
  settingOptionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#718096'
  },
  settingOptionTextActive: {
    color: '#FFFFFF'
  },
  simulationMetricsCard: {
    backgroundColor: 'rgba(0, 168, 150, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0, 168, 150, 0.15)',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20
  },
  metricsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6
  },
  metricsText: {
    fontSize: 11,
    color: '#718096',
    marginVertical: 2,
    fontWeight: '500'
  },
  quizTimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,159,67,0.15)'
  },
  quizTimerBoxTicking: {
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    borderColor: 'rgba(230, 57, 70, 0.15)'
  },
  quizTimerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF9F43',
    marginLeft: 4
  },
  quizContentScroll: {
    padding: 16
  },
  quizStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  quizIndexText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  quizPointsText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#718096',
    textTransform: 'uppercase'
  },
  quizProgressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden'
  },
  quizProgressBarFill: {
    height: '100%',
    backgroundColor: '#00A896',
    borderRadius: 4
  },
  quizQuestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopWidth: 4,
    borderTopColor: '#00A896',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16
  },
  questionSystemRow: {
    backgroundColor: 'rgba(0,168,150,0.06)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  questionSystemText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#00A896'
  },
  quizQuestionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    lineHeight: 20
  },
  quizOptionsList: {
    gap: 10,
    marginBottom: 16
  },
  quizOptionBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  quizOptionBtnCorrect: {
    backgroundColor: 'rgba(46, 204, 113, 0.08)',
    borderColor: '#2ECC71'
  },
  quizOptionBtnIncorrect: {
    backgroundColor: 'rgba(230, 57, 70, 0.08)',
    borderColor: '#E63946'
  },
  quizOptionLetter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  quizOptionLetterCorrect: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71'
  },
  quizOptionLetterIncorrect: {
    backgroundColor: '#E63946',
    borderColor: '#E63946'
  },
  quizOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1
  },
  quizExplanationCard: {
    backgroundColor: 'rgba(0,168,150,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,168,150,0.15)',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  quizExplanationText: {
    fontSize: 11,
    lineHeight: 15,
    color: '#718096',
    flex: 1,
    fontWeight: '500'
  },
  confettiOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    pointerEvents: 'none',
    zIndex: 15
  },
  confettiParticle: {
    position: 'absolute',
    opacity: 0.8
  },
  scoreboardScroll: {
    padding: 24,
    alignItems: 'center'
  },
  celebrateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center'
  },
  celebrateSub: {
    fontSize: 11.5,
    color: '#718096',
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 20
  },
  circularProgressContainer: {
    position: 'relative',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  circularProgressTextBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circularProgressScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  circularProgressLabel: {
    fontSize: 9,
    color: '#718096',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 4
  },
  statsDetailsCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    width: '100%',
    paddingVertical: 14,
    flexDirection: 'row',
    marginBottom: 20
  },
  statsCol: {
    flex: 1,
    alignItems: 'center'
  },
  borderRightLeft: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E2E8F0'
  },
  statsVal: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  statsLabel: {
    fontSize: 9,
    color: '#718096',
    fontWeight: 'bold',
    marginTop: 4
  },
  scoreboardActionRow: {
    width: '100%',
    gap: 10,
    marginBottom: 24
  },
  btnFilledTeal: {
    backgroundColor: '#00A896',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  btnFilledTealText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13.5
  },
  btnOutlinedSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnOutlinedSecondaryText: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 13.5
  },
  scoreboardHistorySection: {
    width: '100%',
    gap: 10,
    marginTop: 10
  },
  scoreboardHistoryHeading: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  toastContainer: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 999
  },
  toastMessageText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end'
  },
  modalSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '65%',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center'
  },
  modalSheetBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12
  },
  modalSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 10
  },
  modalSheetTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  modalSheetCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  historyItemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 2
  },
  historyItemName: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  historyItemMeta: {
    fontSize: 9,
    color: '#718096',
    marginTop: 2
  },
  historyItemScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 42,
    alignItems: 'center'
  },
  historyItemScoreText: {
    fontSize: 10.5,
    fontWeight: 'bold'
  },
  aboutDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#718096',
    fontWeight: '500'
  },
  aboutTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12
  },
  aboutTag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#00A896',
    backgroundColor: 'rgba(0,168,150,0.06)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,168,150,0.1)'
  },
  aboutCreditsCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 10
  },
  aboutCreditsText: {
    fontSize: 9.5,
    lineHeight: 14,
    color: '#2D3748',
    marginVertical: 2
  },
  floatingPresenterBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 998
  },
  floatingPresenterText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: 'bold'
  },
  presenterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  presenterCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#334155',
    width: '100%',
    maxWidth: 380,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  presenterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
    marginBottom: 10
  },
  presenterTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00A896'
  },
  presenterDesc: {
    fontSize: 10.5,
    color: '#94A3B8',
    lineHeight: 15,
    marginBottom: 12
  },
  presenterBtn: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2
  },
  presenterBtnActive: {
    borderColor: '#00A896',
    backgroundColor: 'rgba(0,168,150,0.1)'
  },
  presenterBtnName: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  presenterBtnSub: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2
  },
  tutorialOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  tutorialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10
  },
  tutorialStepIndicator: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20
  },
  tutorialDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  tutorialDotActive: {
    backgroundColor: '#00A896',
    width: 20
  },
  tutorialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10
  },
  tutorialDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24
  },
  tutorialIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0,168,150,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  tutorialBtnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12
  },
  scannerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  scannerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#00A896',
    opacity: 0.8,
    shadowColor: '#00A896',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5
  },
  // Premium Interactive Atlas UI Styles
  atlasContainer: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    padding: 14
  },
  atlasImageWrapper: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  atlasOrganImg: {
    width: 100,
    height: 100
  },
  atlasPartsLabel: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8
  },
  atlasPartsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14
  },
  atlasPartItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  atlasPartItemActive: {
    borderColor: '#00A896',
    backgroundColor: 'rgba(0,168,150,0.06)'
  },
  atlasPartItemText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#718096'
  },
  atlasPartItemTextActive: {
    color: '#00A896'
  },
  atlasHudCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2
  },
  atlasHudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  atlasHudTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  atlasHudMedisBadge: {
    backgroundColor: 'rgba(0,168,150,0.08)',
    borderColor: '#00A896',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  atlasHudMedisText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#00A896'
  },
  atlasHudDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: '#718096',
    fontWeight: '500',
    marginBottom: 12
  },
  atlasHudActions: {
    flexDirection: 'row',
    gap: 10
  },
  // Hotspot Interactive Image Map Styles
  interactiveAtlasContainer: {
    width: '100%',
    height: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2
  },
  interactiveOrganImg: {
    width: '80%',
    height: '80%'
  },
  atlasHotspot: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,168,150,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(0,168,150,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    zIndex: 10
  },
  atlasHotspotActive: {
    backgroundColor: 'rgba(255,159,67,0.25)',
    borderColor: '#FF9F43',
    zIndex: 20,
    transform: [{ translateX: -16 }, { translateY: -16 }, { scale: 1.2 }]
  },
  hotspotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A896'
  },
  hotspotInnerActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9F43',
    shadowColor: '#FF9F43',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4
  }
});

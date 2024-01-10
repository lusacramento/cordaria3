<map version="freeplane 1.11.5">
<!--To view this file, download free mind mapping software Freeplane from https://www.freeplane.org -->
<node TEXT="tables" FOLDED="false" ID="ID_696401721" CREATED="1610381621824" MODIFIED="1704812608518" STYLE="oval">
<font SIZE="18"/>
<hook NAME="MapStyle" zoom="1.1">
    <properties edgeColorConfiguration="#808080ff,#ff0000ff,#0000ffff,#00ff00ff,#ff00ffff,#00ffffff,#7c0000ff,#00007cff,#007c00ff,#7c007cff,#007c7cff,#7c7c00ff" fit_to_viewport="false" associatedTemplateLocation="template:/standard-1.6.mm"/>

<map_styles>
<stylenode LOCALIZED_TEXT="styles.root_node" STYLE="oval" UNIFORM_SHAPE="true" VGAP_QUANTITY="24 pt">
<font SIZE="24"/>
<stylenode LOCALIZED_TEXT="styles.predefined" POSITION="bottom_or_right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="default" ID="ID_271890427" ICON_SIZE="12 pt" COLOR="#000000" STYLE="fork">
<arrowlink SHAPE="CUBIC_CURVE" COLOR="#000000" WIDTH="2" TRANSPARENCY="200" DASH="" FONT_SIZE="9" FONT_FAMILY="SansSerif" DESTINATION="ID_271890427" STARTARROW="NONE" ENDARROW="DEFAULT"/>
<font NAME="SansSerif" SIZE="10" BOLD="false" ITALIC="false"/>
<richcontent TYPE="DETAILS" CONTENT-TYPE="plain/auto"/>
<richcontent TYPE="NOTE" CONTENT-TYPE="plain/auto"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.details"/>
<stylenode LOCALIZED_TEXT="defaultstyle.attributes">
<font SIZE="9"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.note" COLOR="#000000" BACKGROUND_COLOR="#ffffff" TEXT_ALIGN="LEFT"/>
<stylenode LOCALIZED_TEXT="defaultstyle.floating">
<edge STYLE="hide_edge"/>
<cloud COLOR="#f0f0f0" SHAPE="ROUND_RECT"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.selection" BACKGROUND_COLOR="#afd3f7" BORDER_COLOR_LIKE_EDGE="false" BORDER_COLOR="#afd3f7"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.user-defined" POSITION="bottom_or_right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="styles.topic" COLOR="#18898b" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subtopic" COLOR="#cc3300" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subsubtopic" COLOR="#669900">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.important" ID="ID_67550811">
<icon BUILTIN="yes"/>
<arrowlink COLOR="#003399" TRANSPARENCY="255" DESTINATION="ID_67550811"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.AutomaticLayout" POSITION="bottom_or_right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="AutomaticLayout.level.root" COLOR="#000000" STYLE="oval" SHAPE_HORIZONTAL_MARGIN="10 pt" SHAPE_VERTICAL_MARGIN="10 pt">
<font SIZE="18"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,1" COLOR="#0033ff">
<font SIZE="16"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,2" COLOR="#00b439">
<font SIZE="14"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,3" COLOR="#990000">
<font SIZE="12"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,4" COLOR="#111111">
<font SIZE="10"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,5"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,6"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,7"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,8"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,9"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,10"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,11"/>
</stylenode>
</stylenode>
</map_styles>
</hook>
<hook NAME="AutomaticEdgeColor" COUNTER="10" RULE="ON_BRANCH_CREATION"/>
<node TEXT="Tables" POSITION="bottom_or_right" ID="ID_641754645" CREATED="1704812950202" MODIFIED="1704812955569">
<edge COLOR="#007c7c"/>
<node TEXT="User" POSITION="bottom_or_right" ID="ID_1632985893" CREATED="1704812608528" MODIFIED="1704812973286">
<node TEXT="email: string" ID="ID_917346424" CREATED="1704812631596" MODIFIED="1704812788983"/>
<node TEXT="full_name: string" ID="ID_1320791572" CREATED="1704812613542" MODIFIED="1704813895759"/>
<node TEXT="user: string" ID="ID_1995582033" CREATED="1704812624519" MODIFIED="1704812630948"/>
<node TEXT="password: string" ID="ID_237775767" CREATED="1704812636178" MODIFIED="1704812641187"/>
</node>
<node TEXT="config" POSITION="bottom_or_right" ID="ID_909915249" CREATED="1704812800298" MODIFIED="1704812964062">
<node TEXT="id:string" POSITION="bottom_or_right" ID="ID_1634511856" CREATED="1704812662178" MODIFIED="1704813104595">
<arrowlink DESTINATION="ID_917346424"/>
</node>
<node TEXT="counter: number" POSITION="bottom_or_right" ID="ID_176327439" CREATED="1704812675858" MODIFIED="1704812838900"/>
<node TEXT="instrument_default: ENUM[]" POSITION="bottom_or_right" ID="ID_435131889" CREATED="1704812697158" MODIFIED="1704813240912">
<node TEXT="ACOUSTIC_GUITAR" ID="ID_936387742" CREATED="1704813202913" MODIFIED="1704813318073"/>
<node TEXT="ELETRIC_GUITAR" ID="ID_1632418005" CREATED="1704813211981" MODIFIED="1704813312673"/>
<node TEXT="BASS" ID="ID_1266825247" CREATED="1704813217422" MODIFIED="1704813323992"/>
<node TEXT="CAVACO" ID="ID_1380999338" CREATED="1704813219542" MODIFIED="1704813326977"/>
</node>
<node TEXT="theme: ENUM[]" POSITION="bottom_or_right" ID="ID_213830459" CREATED="1704812711698" MODIFIED="1704813260871">
<node TEXT="LIGHT" ID="ID_1785908695" CREATED="1704813260891" MODIFIED="1704813288512"/>
<node TEXT="DARK" ID="ID_756195648" CREATED="1704813289686" MODIFIED="1704813291174"/>
</node>
</node>
</node>
</node>
</map>

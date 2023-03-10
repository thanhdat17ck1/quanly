USE [PMS_TGI_1802]
GO
/****** Object:  StoredProcedure [dbo].[SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT]    Script Date: 01-03-02023 8:17:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT]
@Action nvarchar(20),@FromDate Datetime
,@ToDate Datetime,
@UserName varchar(200),
@timeline varchar(200),
@MaHangKhach varchar(200)
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	IF OBJECT_ID('tempdb..#tblBCTHDTMAINAD') IS NOT NULL
				DROP TABLE #tblBCTHDTMAINAD
			IF OBJECT_ID('tempdb..#tblBCTHDTSPDATAD') IS NOT NULL
				DROP TABLE #tblBCTHDTSPDATAD
			IF OBJECT_ID('tempdb..#tblBCTHDTSOLDAD') IS NOT NULL
				DROP TABLE #tblBCTHDTSOLDAD
			IF OBJECT_ID('tempdb..#tblBCTHDTSOLDAD') IS NOT NULL
				DROP TABLE #tblBCTHDTSOLDAD

			select tb.LineX,tb.PoId,tb.StypeId,sum(isnull(tb.Quantity,0)) + sum(isnull(nk.SuaDat,0)) as TH_Ngay into #tblBCTHDTSPDATAD
			from (select DateCreate,LineX,PoId,StypeId, sum(Quantity) Quantity
			from dbo.SEW_CoefficientStyle
				where StepId = 'FD1A02EB-1EEE-4CE8-AF9F-021AF05EA5CB' and convert(date,DateCreate) between convert(date,@FromDate) and convert(date,@ToDate)
					group by DateCreate,LineX,PoId,StypeId) tb
			left join (select NgayKiem, LineX, PlanCode, StyleID, sum(SuaDat) SuaDat 
							from dbo.QTY_MAHANG_NGAYKIEM 
								where convert(date,NgayKiem) between convert(date,@FromDate) and convert(date,@ToDate)
									group by NgayKiem,LineX, PlanCode, StyleID)  nk on nk.LineX = tb.LineX and nk.PlanCode = tb.PoId and nk.StyleID = tb.StypeId and convert(date,nk.NgayKiem) = convert(date,tb.DateCreate)
			group by tb.LineX,tb.PoId,tb.StypeId

			 select DepID,AVG(SoLaoDong) - AVG(SoLaoDongVang) as SoLD into #tblBCTHDTSOLDAD
			 from dbo.SEW_NHANLUC  
			 where convert(date,NgayLamViec) between convert(date,@FromDate) and convert(date,@ToDate)
			 group by DepID 

			 select tb.LineX, tb.PoId, x.Name+'_'+(case when x.Id_Factory = 'XN01' or x.Id_Factory = 'XN02' then 'X2' else 'X3' end) as DonVi, tb.StypeId,Max(sl.SoLD) as SoLD,'' as XiNghiep,'' as STT,isnull(sum(tb.TH_Ngay),0) SanPham into #tblBCTHDTMAINAD
			 from  #tblBCTHDTSPDATAD tb
			 inner join dbo.tbl_SettingLineX x on x.ID = tb.LineX
			 left join #tblBCTHDTSOLDAD sl on sl.DepID = tb.LineX 
			 where tb.TH_Ngay > 0 
			 group by tb.LineX, tb.PoId, x.Name, tb.StypeId,x.Id_Factory
			 ORDER BY DonVi 



	if(@Action='GetTopDTKH')
	begin
		if(@UserName = 'admin')
		begin
			if(@timeline = 'namtruoc')
			begin
				set @FromDate =  DATEADD(YEAR, -1, DATEADD(YEAR, DATEDIFF(YEAR, 0, GETDATE()), 0))
				set @ToDate =   DATEADD(DAY, -1, DATEADD(YEAR, DATEDIFF(YEAR, 0, GETDATE()), 0))
			end
			else if(@timeline = 'thangtruoc')
			begin
				set @FromDate = DATEADD(MONTH, -1, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0))
				set @ToDate =   EOMONTH(DATEADD(MONTH, -1, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)))
				
			end
			else if(@timeline = 'tuantruoc')
			begin 
				set @FromDate =  DATEADD(wk, DATEDIFF(wk, 0, GETDATE()) - 1, 0)
				set @ToDate =   DATEADD(wk, DATEDIFF(wk, 0, GETDATE()) - 1, 6)
			end
			else if(@timeline = 'tatca')
			begin 
				set @FromDate =  '01-01-2010'
				set @ToDate =   DATEADD(wk, DATEDIFF(wk, 0, GETDATE()), 3)
			end
			begin

			IF OBJECT_ID('tempdb..#tblBCTHDTMAINAD1') IS NOT NULL
				DROP TABLE #tblBCTHDTMAINAD1
			IF OBJECT_ID('tempdb..#tblBCTHDTSPDATAD1') IS NOT NULL
				DROP TABLE #tblBCTHDTSPDATAD1
			IF OBJECT_ID('tempdb..#tblBCTHDTSOLDAD1') IS NOT NULL
				DROP TABLE #tblBCTHDTSOLDAD1
			IF OBJECT_ID('tempdb..#tblBCTHDTSOLDAD1') IS NOT NULL
				DROP TABLE #tblBCTHDTSOLDAD1

			select tb.LineX,tb.PoId,tb.StypeId,sum(isnull(tb.Quantity,0)) + sum(isnull(nk.SuaDat,0)) as TH_Ngay into #tblBCTHDTSPDATAD1
			from (select DateCreate,LineX,PoId,StypeId, sum(Quantity) Quantity
			from dbo.SEW_CoefficientStyle
				where StepId = 'FD1A02EB-1EEE-4CE8-AF9F-021AF05EA5CB' and convert(date,DateCreate) between convert(date,@FromDate) and convert(date,@ToDate)
					group by DateCreate,LineX,PoId,StypeId) tb
			left join (select NgayKiem, LineX, PlanCode, StyleID, sum(SuaDat) SuaDat 
							from dbo.QTY_MAHANG_NGAYKIEM 
								where convert(date,NgayKiem) between convert(date,@FromDate) and convert(date,@ToDate)
									group by NgayKiem,LineX, PlanCode, StyleID)  nk on nk.LineX = tb.LineX and nk.PlanCode = tb.PoId and nk.StyleID = tb.StypeId and convert(date,nk.NgayKiem) = convert(date,tb.DateCreate)
			group by tb.LineX,tb.PoId,tb.StypeId

			 select DepID,AVG(SoLaoDong) - AVG(SoLaoDongVang) as SoLD into #tblBCTHDTSOLDAD1
			 from dbo.SEW_NHANLUC  
			 where convert(date,NgayLamViec) between convert(date,@FromDate) and convert(date,@ToDate)
			 group by DepID 

			 select tb.LineX, tb.PoId, x.Name+'_'+(case when x.Id_Factory = 'XN01' or x.Id_Factory = 'XN02' then 'X2' else 'X3' end) as DonVi, tb.StypeId,Max(sl.SoLD) as SoLD,'' as XiNghiep,'' as STT,isnull(sum(tb.TH_Ngay),0) SanPham into #tblBCTHDTMAINAD1
			 from  #tblBCTHDTSPDATAD1 tb
			 inner join dbo.tbl_SettingLineX x on x.ID = tb.LineX
			 left join #tblBCTHDTSOLDAD1 sl on sl.DepID = tb.LineX 
			 where tb.TH_Ngay > 0 
			 group by tb.LineX, tb.PoId, x.Name, tb.StypeId,x.Id_Factory
			 ORDER BY DonVi 


			 --select tb.linex, tb.poid as id_pro, tb.donvi,case when l.season is not null then tb.stypeid+' - '+l.season else tb.stypeid end as mahang,tb.sold,tb.xinghiep,tb.stt,tb.sanpham,tb.sanpham*l.usd as doanhthu,kh.khachhang,l.usd as giacm 
			 --from #tblbcthdtmainad tb
			 --inner join dbo.erp_lenhsx l on l.malenh = tb.poid
			 --left join dbo.dic_khachhang kh on kh.makhachhang = l.makhachhang

			 --Top 3 doanh thu của khách hàng cao nhất
			 select top(3) sum(tb.SanPham*l.USD) as DoanhThu,kh.KhachHang
			 from #tblBCTHDTMAINAD1 tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 group by kh.KhachHang
			 order by DoanhThu desc

			 
			 

			 -- select DISTINCT kh.KhachHang, kh.MaKhachHang
			 --from #tblBCTHDTMAINAD tb
			 --inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 --left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 


			 --Top 5 doanh thu của xưởng cao nhất
			 select case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end as MaHang,tb.SanPham*l.USD as DoanhThu
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 order by MaHang desc

			 ----Top chuyền có doanh thu cao nhất
			  select top(3) tb.LineX,sum(tb.SanPham*l.USD) as DoanhThu
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 group by tb.Linex
			 order by DoanhThu desc

			return @@error
			end
		end
	end
	if(@Action='GETChiTietDTKH')
	begin
			select DISTINCT tb.DonVi,sum(tb.SanPham*l.USD) as DoanhThu
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 where kh.MaKhachHang = @MaHangKhach
			 group by tb.DonVi
	end
	if(@Action='GETDSKH')
	begin
			select DISTINCT kh.MaKhachHang, kh.KhachHang
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
	end
	if(@Action='GETDTTungMaHang')
	begin
			 --select tb.linex, tb.poid as id_pro, tb.donvi,case when l.season is not null then tb.stypeid+' - '+l.season else tb.stypeid end as mahang,tb.sold,tb.xinghiep,tb.stt,tb.sanpham,tb.sanpham*l.usd as doanhthu,kh.khachhang,l.usd as giacm 
			 --from #tblbcthdtmainad tb
			 --inner join dbo.erp_lenhsx l on l.malenh = tb.poid
			 --left join dbo.dic_khachhang kh on kh.makhachhang = l.makhachhang

			 select top(10) case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end as MaHang,sum(tb.SanPham*l.USD) as DoanhThu
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 group by case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end
			 order by DoanhThu desc
	end
	if(@Action='GETDTTheoSoLuong')
	begin
			 --select tb.linex, tb.poid as id_pro, tb.donvi,case when l.season is not null then tb.stypeid+' - '+l.season else tb.stypeid end as mahang,tb.sold,tb.xinghiep,tb.stt,tb.sanpham,tb.sanpham*l.usd as doanhthu,kh.khachhang,l.usd as giacm 
			 --from #tblbcthdtmainad tb
			 --inner join dbo.erp_lenhsx l on l.malenh = tb.poid
			 --left join dbo.dic_khachhang kh on kh.makhachhang = l.makhachhang

			 select top(10) case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end as MaHang, sum(tb.SanPham) as SanPham
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 group by case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end
			 order by SanPham desc
	end
	if(@Action='GETDTTheo')
	begin
			 select tb.linex, tb.poid as id_pro, tb.donvi,case when l.season is not null then tb.stypeid+' - '+l.season else tb.stypeid end as mahang,tb.sold,tb.xinghiep,tb.stt,tb.sanpham,tb.sanpham*l.usd as doanhthu,kh.khachhang,l.usd as giacm 
			 from #tblbcthdtmainad tb
			 inner join dbo.erp_lenhsx l on l.malenh = tb.poid
			 left join dbo.dic_khachhang kh on kh.makhachhang = l.makhachhang

			 --select top(10) case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end as MaHang, sum(tb.SanPham) as SanPham
			 --from #tblBCTHDTMAINAD tb
			 --inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 --left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 --group by case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end
			 --order by SanPham desc
	end
	if(@Action='GETDTHomNay')
	begin

			 select sum(tb.sanpham*l.usd) as doanhthu
			 from #tblBCTHDTMAINAD tb
			 inner join dbo.ERP_LENHSX l on l.MaLenh = tb.PoId
			 left join dbo.DIC_KHACHHANG kh on kh.MaKhachHang = l.MaKhachHang
			 group by case when l.SeaSon is not null then tb.StypeId+' - '+l.SeaSon else tb.StypeId end
			 order by SanPham desc
	end
END

--exec SP_ERP_BAOCAOTONGHOPDOANHTHUWEB_REPORT 'GETDTTheoSoLuong', '06-01-2022', '06-30-2022','admin','',''

